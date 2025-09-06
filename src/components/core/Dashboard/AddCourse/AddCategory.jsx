import React, { useState } from "react"
import { useSelector } from "react-redux"
import { createCategory } from "../../../../services/operations/courseDetailsAPI"

const AddCategory = () => {
  const { token } = useSelector((state) => state.auth)
  const [formData, setFormData] = useState({ name: "", description: "" })
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!formData.name || !formData.description) {
      return alert("Please fill all fields")
    }
    setLoading(true)
    await createCategory(formData, token)
    setFormData({ name: "", description: "" }) // reset form
    setLoading(false)
  }

  return (
    <div className="w-[60%] bg-gray-700 p-6 rounded-lg shadow-lg">
      <form onSubmit={handleSubmit}>
        <h1 className="text-2xl font-semibold mb-4">Add Category</h1>

        <div>
          <label htmlFor="name" className="p-2 my-2">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full bg-gray-600 rounded p-2 mb-4 text-white outline-none"
            placeholder="Enter category name"
          />
        </div>

        <div>
          <label htmlFor="description" className="p-2 my-2">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full bg-gray-600 rounded p-2 mb-4 text-white outline-none"
            placeholder="Enter category description"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-yellow-500 text-black font-medium rounded px-4 py-2 hover:bg-yellow-400 transition"
        >
          {loading ? "Adding..." : "Add"}
        </button>
      </form>
    </div>
  )
}

export default AddCategory
