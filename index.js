import React from 'react'
import ReactDOM from 'react-dom'

import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.css' // Import precompiled Bootstrap css

const PRODUCTS = [
    {
        category: 'Sporting Goods',
        price: '$49.99',
        stocked: true,
        name: 'Football',
    },
    {
        category: 'Sporting Goods',
        price: '$9.99',
        stocked: true,
        name: 'Baseball',
    },
    {
        category: 'Sporting Goods',
        price: '$29.99',
        stocked: false,
        name: 'Basketball',
    },
    {
        category: 'Electronics',
        price: '$99.99',
        stocked: true,
        name: 'iPod Touch',
    },
    {
        category: 'Electronics',
        price: '$399.99',
        stocked: false,
        name: 'iPhone 5',
    },
    {
        category: 'Electronics',
        price: '$199.99',
        stocked: true,
        name: 'Nexus 7',
    },
]

function ProductCategoryRow({ category }) {
    return (
        <tr>
            <th colSpan="2">{category}</th>
        </tr>
    )
}

function ProductRow({ product }) {
    const name = product.stocked ? (
        product.name
    ) : (
        <span className="text-danger">{product.name}</span>
    )
    return (
        <tr>
            <td>{name}</td>
            <td>{product.price}</td>
        </tr>
    )
}

function ProductTable({ products, inStockOnly, filterText }) {
    const rows = []
    let lastCategory = null

    products.forEach((product) => {
        if (
            (inStockOnly && !product.stocked) ||
            product.name.indexOf(filterText) === -1
        ) {
            return
        }

        if (product.category !== lastCategory) {
            lastCategory = product.category
            rows.push(
                <ProductCategoryRow
                    key={lastCategory}
                    category={product.category}
                />
            )
        }
        rows.push(<ProductRow key={product.name} product={product} />)
    })

    return (
        <table className="table">
            <thead>
                <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Price</th>
                </tr>
            </thead>
            <tbody>{rows}</tbody>
        </table>
    )
}

class SearchBar extends React.Component {
    constructor(props) {
        super(props)
        this.handleFilterTextChange = this.handleFilterTextChange.bind(this)
        this.handleInStockChange = this.handleInStockChange.bind(this)
    }

    handleFilterTextChange(e) {
        this.props.onFilterTextChange(e.target.value)
    }

    handleInStockChange(e) {
        this.props.onStockChange(e.target.checked)
    }

    render() {
        const { filterText, inStockOnly } = this.props
        return (
            <div className="mt-4 mb-4">
                <div className="form-group">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="rechercher"
                        value={filterText}
                        onChange={this.handleFilterTextChange}
                    />
                </div>
                <div className="form-check">
                    <input
                        type="checkbox"
                        className="form-check-input"
                        id="stock"
                        checked={inStockOnly}
                        onChange={this.handleInStockChange}
                    />
                    <label htmlFor="stock" className="form-check-label">
                        Produit en stock seulement
                    </label>
                </div>
            </div>
        )
    }
}

class FilterableProductTable extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            filterText: '',
            inStockOnly: false,
        }
        this.handleFilterTextChange = this.handleFilterTextChange.bind(this)
        this.handleInStockChange = this.handleInStockChange.bind(this)
    }

    handleFilterTextChange(filterText) {
        this.setState({ filterText })
    }
    handleInStockChange(inStockOnly) {
        this.setState({ inStockOnly })
    }

    render() {
        const { products } = this.props
        return (
            <div className="container">
                {JSON.stringify(this.state)}
                <SearchBar
                    filterText={this.state.filterText}
                    inStockOnly={this.state.inStockOnly}
                    onFilterTextChange={this.handleFilterTextChange}
                    onStockChange={this.handleInStockChange}
                />
                <ProductTable
                    products={products}
                    filterText={this.state.filterText}
                    inStockOnly={this.state.inStockOnly}
                />
            </div>
        )
    }
}

ReactDOM.render(
    <FilterableProductTable products={PRODUCTS} />,
    document.getElementById('app')
)
