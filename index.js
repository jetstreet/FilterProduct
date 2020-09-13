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

function ProductTable({ products }) {
    const rows = []
    let lastCategory = null

    products.forEach((product) => {
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

class FilterableProductTable extends React.Component {
    render() {
        const { products } = this.props
        return (
            <div>
                <ProductTable products={products} />
            </div>
        )
    }
}

ReactDOM.render(
    <FilterableProductTable products={PRODUCTS} />,
    document.getElementById('app')
)
