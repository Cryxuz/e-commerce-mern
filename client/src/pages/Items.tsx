import { useState, useEffect } from 'react'
import axios from 'axios'
import { ItemInterface } from '../interfaces/iteminterface'
import { Link } from 'react-router-dom'
import { FaAudioDescription } from 'react-icons/fa'

const Items = () => {
  const [items, setItems] = useState<ItemInterface[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5

  useEffect(() => {
    axios
      .get<ItemInterface[]>('http://localhost:3000/items')
      .then((response) => {
        console.log(response.data)
        setItems(response.data)
      })
      .catch((error) => {
        console.error('Error fetching items:', error)
      })
  }, [])

  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = items.slice(indexOfFirstItem, indexOfLastItem)

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber)

  const handleAddToCart = (itemId: string) => {
    const selectedItem = items.find((item) => item._id === itemId)
    if (selectedItem) {
      axios
        .post(`http://localhost:3000/cartitems`, {
          user_id: 'to be added',
          item_id: itemId,
          quantity: 1,
          description: selectedItem.description,
          price: selectedItem.price,
        })
        .then((response) => {
          console.log('Item added to cart:', response.data)
        })
        .catch((error) => {
          console.error('Error adding item to cart:', error)
        })
    }
  }

  return (
    <div>
      <div className="md:grid md:grid-cols-2 pt-[15%] md:pt-[5%] mx-10 mb-10">
        <div className="col-span-1 flex items-center justify-center bg-cyan-100">
          <img
            className="w-[70%] md:w-[80%] lg:w-[60%] rotate-[-15deg] rounded-lg"
            src="/images/items-page.jpg"
            alt=""
          />
        </div>
        <div className="col-span bg-cyan-50 p-10">
          <h2 className="text-3xl text-center md:text-left md:text-5xl px-[3%]">
            Costumes, Hats, Accessories & More!
          </h2>
          <br />
          <p className="text-center md:text-left text-xl p-[3%]">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Rerum
            eligendi aliquid, fugiat assumenda dicta amet quas animi iure
            repudiandae? Impedit, illo cum id eligendi sapiente ducimus veniam
            aperiam maiores ratione.
          </p>
        </div>
      </div>
      <div className=" grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 p-4 md:p-16">
        {currentItems.map((item) => (
          <div
            key={item._id}
            className="border rounded-lg p-8 flex flex-col shadow-xl"
          >
            <h2 className="text-sm font-bold">{item.name}</h2>

            <div className="flex justify-center w-full items-center">
              <img
                src={item.imageUrl}
                alt={item.name}
                className="object-cover h-60 w-60 m-4 rounded-md"
              />
            </div>
            <div className="mt-2">
              <p>
                <span className="font-medium text-lg">Category: </span>{' '}
                {item.category}
              </p>
              <p>
                <span className="font-medium text-lg">Price:</span> $
                {item.price}
              </p>
              <p>
                <span className="font-medium text-lg">Rating:</span>{' '}
                {(() => {
                  switch (item.rating) {
                    case 1:
                      return '★☆☆☆☆'
                    case 2:
                      return '★★☆☆☆'
                    case 3:
                      return '★★★☆☆'
                    case 4:
                      return '★★★★☆'
                    case 5:
                      return '★★★★★'
                    default:
                      return 'Not rated'
                  }
                })()}
              </p>
              <p>
                <span
                  className={
                    item.stock === 0 ? 'text-red-500' : 'text-green-700'
                  }
                >
                  {item.stock === 0 ? 'Out of Stock' : 'In Stock'}
                </span>
              </p>
              {item.stock > 0 ? (
                <div className="flex gap-2 flex-end">
                  <button
                    onClick={() => handleAddToCart(item._id)}
                    className="p-2 bg-orange-600 rounded-lg text-white hover:bg-orange-500 mt-4"
                  >
                    Add To Cart
                  </button>
                  <Link to={`/items/${item._id}`}>
                    <button className="p-2 bg-orange-600 rounded-lg text-white hover:bg-orange-500 mt-4">
                      View Item
                    </button>
                  </Link>
                </div>
              ) : (
                <div className="flex  gap-2">
                  <div className="p-2 bg-red-600 rounded-lg text-white mt-4">
                    Out of Stock
                  </div>
                  <Link to={`/items/${item._id}`}>
                    <button className="p-2 bg-orange-600 rounded-lg text-white hover:bg-orange-500 mt-4">
                      View Item
                    </button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-4">
        <button
          className="bg-orange-600 hover:bg-orange-500 text-white font-bold py-2 px-4 rounded-lg mr-2"
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <div>
          <p className="bg-orange-600 hover:bg-orange-500 text-white font-bold py-2 px-4 rounded-lg">
            {currentPage}
          </p>
        </div>
        <button
          className="bg-orange-600 hover:bg-orange-500 text-white font-bold py-2 px-4 rounded-lg ml-2"
          onClick={() => paginate(currentPage + 1)}
          disabled={indexOfLastItem >= items.length}
        >
          Next
        </button>
      </div>
    </div>
  )
}

export default Items
