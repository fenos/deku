package dqlx

import (
	"context"
	"strings"

	"github.com/dgraph-io/dgo/v200"
)

// QueryBuilder represents the public API for building a secure dynamic Dgraph
// query.
type QueryBuilder struct {
	rootEdge      edge
	variables     []QueryBuilder
	childrenEdges map[string][]QueryBuilder
	unmarshalInto interface{}

	client *dgo.Dgraph
}

// Query initializes the query builder with the provided root filter.
//
// example:
//   dqlx.Query(dqlx.EqFn(..,..))
func Query(rootQueryFn *FilterFn) QueryBuilder {
	var rootFilter DQLizer

	if rootQueryFn != nil {
		rootFilter = *rootQueryFn
	}

	builder := QueryBuilder{
		rootEdge: edge{
			Name:       "rootQuery",
			RootFilter: rootFilter,
			Filters:    []DQLizer{},
			IsRoot:     true,
			IsVariable: false,
		},
		childrenEdges: map[string][]QueryBuilder{},
	}

	builder.rootEdge.Node = node{
		ParentName: builder.rootEdge.Name,
		Edges:      builder.childrenEdges,
	}
	return builder
}

// QueryType alias to initialize a query with the root function type()
//
// Example:
//   dqlx.QueryType("User")
//   dqlx.Query(dqlx.TypeFn("User")) // equivalent
func QueryType(typeName string) QueryBuilder {
	return Query(TypeFn(typeName))
}

// QueryEdge initialize a query builder with a specific name for the edge.
// Useful for reusable edges.
//
// Example:
//   dqlx.QueryEdge("name", dqlx.EqFn(..,..))
func QueryEdge(edgeName string, rootQueryFn *FilterFn) QueryBuilder {
	return Query(rootQueryFn).Name(edgeName)
}

// Variable initializes a variable query builder.
//
// Example:
//   dqlx.Variable(dqlx.EqFn(..,..))
func Variable(rootQueryFn *FilterFn) QueryBuilder {
	query := Query(rootQueryFn)
	query.rootEdge.IsVariable = true
	return query
}

// As sets an alias for the edge.
//
// Example:
//   dqlx.Query(...).As("C") // -> { C as rootQuery(func: ...) { ... } }
func (builder QueryBuilder) As(name string) QueryBuilder {
	builder.rootEdge.Alias = name
	return builder
}

// Name sets the name of the edge.
//
// Example:
//   dqlx.Query(...).Name("bladerunner") // -> { bladerunner(func: ...) { ... }
func (builder QueryBuilder) Name(name string) QueryBuilder {
	builder.rootEdge.Name = name
	builder.rootEdge.Node.ParentName = name
	return builder
}

// ToDQL returns the current state of the query as a DQL string.
//
// Example:
//   dqlx.Query(...).ToDQL()
func (builder QueryBuilder) ToDQL() (query string, args map[string]string, err error) {
	return QueriesToDQL(builder)
}

// Variable registers a variable within the query
//
// Example:
//   dqlx.Query(...).Variable(variable)
func (builder QueryBuilder) Variable(queryBuilder QueryBuilder) QueryBuilder {
	builder.variables = append(builder.variables, queryBuilder)
	return builder
}

// Select assigns predicates to the selection set.
//
// Examples:
//   dqlx.Query(...).Select(`
//     field1
//     field2
//     field3
//   `)
//   dqlx.Query(...).Select("field1", "field2", "field3")
func (builder QueryBuilder) Select(predicates ...interface{}) QueryBuilder {
	if len(predicates) == 0 {
		return builder
	}

	attributes := Select(predicates...).(nodeAttributes)

	selectedNode := node{
		ParentName:          builder.rootEdge.Name,
		HasParentAttributes: len(attributes.predicates) > 0,
		Edges:               builder.childrenEdges,
		Attributes:          attributes,
	}

	builder.rootEdge.Node = selectedNode

	return builder
}

// Fields alias of Select
// @Deprecated: use Select() instead
func (builder QueryBuilder) Fields(predicates ...interface{}) QueryBuilder {
	return builder.Select(predicates...)
}

// Facets requests facets for the current query
//
// Examples:
//   dqlx.Query(...).Facets("field1")
//   dqlx.Query(...).Facets(dqlx.Eq{"field1": "value"})
func (builder QueryBuilder) Facets(predicates ...interface{}) QueryBuilder {
	builder.rootEdge.Facets = append(builder.rootEdge.Facets, facetExpr{
		Predicates: predicates,
	})

	return builder
}

// Order requests an ordering for the result set
//
// Examples:
//   dqlx.Query(...).Order(dqlx.OrderAsc("field1"))
//   dqlx.Query(...).Order(dqlx.OrderDesc("field2"))
func (builder QueryBuilder) Order(order DQLizer) QueryBuilder {
	builder.rootEdge.Order = append(builder.rootEdge.Order, order)
	return builder
}

// OrderAsc alias for ordering in ascending order
//
// Example:
//   dqlx.Query(...).OrderAsc("field1")
//   dqlx.Query(...).Order(dqlx.OrderAsc("field1")) // equivalent
func (builder QueryBuilder) OrderAsc(predicate interface{}) QueryBuilder {
	builder.rootEdge.Order = append(builder.rootEdge.Order, orderBy{
		Direction: OrderDirectionAsc,
		Predicate: predicate,
	})
	return builder
}

// OrderDesc alias for ordering in descending order
//
// Example:
//   dqlx.Query(...).OrderDesc("field1")
//   dqlx.Query(...).Order(dqlx.OrderDesc("field1")) // equivalent
func (builder QueryBuilder) OrderDesc(predicate interface{}) QueryBuilder {
	builder.rootEdge.Order = append(builder.rootEdge.Order, orderBy{
		Direction: OrderDirectionDesc,
		Predicate: predicate,
	})
	return builder
}

// Filter requests filters for this query
//
// Example:
//   dqlx.Query(...).Filter(dqlx.Eq{...}, dqlx.Gt{...})
func (builder QueryBuilder) Filter(filters ...DQLizer) QueryBuilder {
	for _, filter := range filters {
		builder.rootEdge.Filters = append(builder.rootEdge.Filters, filter)
	}
	return builder
}

// Paginate requests paginated results
//
// Example:
//   dqlx.Query(...).Paginate(dqlx.Cursor{...})
func (builder QueryBuilder) Paginate(pagination Cursor) QueryBuilder {
	builder.rootEdge.Pagination = pagination
	return builder
}

// GroupBy adds a groupby directive.
func (builder QueryBuilder) GroupBy(predicates ...string) QueryBuilder {
	for _, field := range predicates {
		builder.rootEdge.Group = append(builder.rootEdge.Group, GroupBy(field))
	}
	return builder
}

// Cascade adds a cascade directive.
func (builder QueryBuilder) Cascade(fields ...string) QueryBuilder {
	builder.rootEdge.Cascade = Cascade(fields...)

	return builder
}

// Edge adds an edge in the query selection.
//
// Examples:
//   dqlx.Query(...).Edge("path")
//   dqlx.Query(...).Edge("parent->child->child")
//   dqlx.Query(...).Edge("parent->child->child", dqlx.Select(""))
func (builder QueryBuilder) Edge(fullPath string, queryParts ...DQLizer) QueryBuilder {
	return builder.EdgeAs("", fullPath, queryParts...)
}

// EdgeAs adds an aliased edge in the query selection.
//
// Example:
//   dqlx.Query(...).EdgeAs("C", "path", ...)
func (builder QueryBuilder) EdgeAs(as string, fullPath string, queryParts ...DQLizer) QueryBuilder {
	return builder.EdgeFnAs(as, fullPath, func(builder QueryBuilder) QueryBuilder {
		for _, part := range queryParts {
			switch cast := part.(type) {
			case filterExpr:
				builder = builder.Filter(part)
			case nodeAttributes:
				builder = builder.Select(cast.predicates...)
			case Cursor:
				builder = builder.Paginate(cast)
			case orderBy:
				builder = builder.Order(cast)
			case group:
				builder = builder.GroupBy(cast.Predicate)
			case facetExpr:
				builder = builder.Facets(cast.Predicates...)
			case cascadeExpr:
				builder = builder.Cascade(cast.fields...)
			case DQLizer:
				builder = builder.Filter(cast)
			}
		}
		return builder
	})
}

// EdgePath adds an edge in the query selection. Slice syntax is used to define
// the path.
//
// Example:
//   dqlx.Query(...).EdgePath([]string{"parent", "child", "child")
//   dqlx.Query(...).Edge("parent->child->child") // equivalent
func (builder QueryBuilder) EdgePath(fullPath []string, queryParts ...DQLizer) QueryBuilder {
	return builder.Edge(EdgePath(fullPath...), queryParts...)
}

// EdgePathAs adds an aliased edge in the query selection. Slice syntax is used
// to define the path.
//
// Example:
//   dqlx.Query(...).EdgePathAs([]string{"parent", "child", "child")
//   dqlx.Query(...).EdgeAs("parent->child->child") // equivalent
func (builder QueryBuilder) EdgePathAs(as string, fullPath []string, queryParts ...DQLizer) QueryBuilder {
	return builder.EdgeAs(as, EdgePath(fullPath...), queryParts...)
}

// EdgeFn adds an edge in the query selection with a callback and query methods.
//
// Example:
//   dqlx.Query(...).EdgeFn("path", func(builder QueryBuilder) {
//     return builder.Select(...).Filter(...)
//   })
func (builder QueryBuilder) EdgeFn(fullPath string, fn func(builder QueryBuilder) QueryBuilder) QueryBuilder {
	return builder.addEdgeFn("", QueryEdge(fullPath, nil), fn)
}

// EdgeFnAs adds an aliased edge in the query selection with a callback and
// query methods.
//
// Example:
//   dqlx.Query(...).EdgeFn("path", func(builder QueryBuilder) {
//     return builder.Select(...).Filter(...)
//   })
func (builder QueryBuilder) EdgeFnAs(as string, fullPath string, fn func(builder QueryBuilder) QueryBuilder) QueryBuilder {
	return builder.addEdgeFn(as, QueryEdge(fullPath, nil), fn)
}

// EdgeFromQuery adds an external constructed edge to the query.
//
// Example:
//   dqlx.Query(...).EdgeFromQuery(dqlx.Query(...))
func (builder QueryBuilder) EdgeFromQuery(edge QueryBuilder) QueryBuilder {
	return builder.addEdgeFn("", edge, nil)
}

// UnmarshalInto requests to unmarshal the result set into this specific
// interface{}.
//
// Example:
//   dqlx.Query(...).UnmarshalInto(&value)+
func (builder QueryBuilder) UnmarshalInto(value interface{}) QueryBuilder {
	builder.unmarshalInto = value
	return builder
}

// WithDClient allows to swap the underline dgo.Dgraph client.
//
// Example:
//   dqlx.Query(...).WithDClient(dgoClient)
func (builder QueryBuilder) WithDClient(client *dgo.Dgraph) QueryBuilder {
	builder.client = client
	return builder
}

// Execute executes the current state of the query and thereby sends the
// operation to DGraph.
//
// Example:
//   dqlx.Query(...).Execute(ctx, ...)
func (builder QueryBuilder) Execute(ctx context.Context, options ...OperationExecutorOptionFn) (*Response, error) {
	executor := NewDGoExecutor(builder.client)

	for _, option := range options {
		option(executor)
	}
	return executor.ExecuteQueries(ctx, builder)
}

// GetName returns the name of the query edge.
func (builder QueryBuilder) GetName() string {
	return builder.rootEdge.Name
}

func (builder QueryBuilder) addEdgeFn(as string, query QueryBuilder, fn func(builder QueryBuilder) QueryBuilder) QueryBuilder {
	edgePathParts := ParseEdge(query.rootEdge.Name)

	if len(edgePathParts) == 0 {
		return builder
	}

	edgeBuilder := query
	edgeBuilder.rootEdge.IsRoot = false
	edgeBuilder.rootEdge.Node.Edges = builder.childrenEdges
	edgeBuilder.rootEdge.Node.HasParentAttributes = builder.rootEdge.Node.Attributes != nil
	edgeBuilder.childrenEdges = builder.childrenEdges

	var parentPath string

	if len(edgePathParts) == 1 {
		parentPath = builder.rootEdge.Name
	} else {
		parents := edgePathParts[0 : len(edgePathParts)-1]
		parentPath = strings.Join(parents, symbolEdgeTraversal)
	}

	if fn != nil {
		edgeBuilder = fn(edgeBuilder)
	}

	if as != "" {
		edgeBuilder = edgeBuilder.As(as)
	}

	builder.childrenEdges[parentPath] = append(builder.childrenEdges[parentPath], edgeBuilder)

	return builder
}

// IsEmptyQuery indicates if a given query is an empty generated query.
func IsEmptyQuery(query string) bool {
	return "query () {  {  } }" == query
}
