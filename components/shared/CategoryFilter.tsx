"use client"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select"
import { getAllCategories } from "@/lib/actions/category.actions"
import { ICategory } from "@/lib/database/models/category.model"
import { formUrlQuery, removeKeysFromQuery } from "@/lib/utils"
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"

const CategoryFilter = () => {
  const [categories, setCategories] = useState<ICategory[]>()
  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    getAllCategories()
      .then((allCategory) => setCategories(allCategory as ICategory[]))
      .catch((err) => console.log(err))
  }, [])

  const onChangeCategories = (category: string) => {
    let newUrl: string
    if (category && category !== "All") {
      newUrl = formUrlQuery({
        params: searchParams.toString(),
        key: "category",
        value: category
      })
    } else {
      newUrl = removeKeysFromQuery({
        params: searchParams.toString(),
        keysToRemove: ["category"]
      })
    }

    router.push(newUrl, { scroll: false })
  }

  return (
    <Select onValueChange={(value: string) => onChangeCategories(value)}>
      <SelectTrigger className="select-field">
        <SelectValue placeholder="Category" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="All" className="select-item p-regular-14">
          All
        </SelectItem>
        {categories?.map((category) => (
          <SelectItem
            value={category.name}
            className="select-item p-regular-14 capitalize"
            key={category._id}
          >
            {category.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
export default CategoryFilter
