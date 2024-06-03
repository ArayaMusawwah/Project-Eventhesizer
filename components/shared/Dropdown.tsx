import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { ICategory } from '@/lib/database/models/category.model'
import { startTransition, useEffect, useState } from 'react'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from '@/components/ui/alert-dialog'
import { Input } from '../ui/input'
import {
  createCategory,
  getAllCategories
} from '@/lib/actions/category.actions'

type Props = {
  onChangeHandler?: (value: string) => void
  value?: string
}

const Dropdown = ({ onChangeHandler, value }: Props) => {
  const [categories, setCategories] = useState<ICategory[]>([])
  const [newCategories, setNewCategories] = useState<string>()

  const handleAddCategory = () => {
    createCategory({
      categoryName: newCategories!.trim()
    }).then((category) => setCategories((prev) => [...prev, category]))
  }

  useEffect(() => {
    getAllCategories()
      .then((allCategory) => setCategories(allCategory as ICategory[]))
      .catch((err) => console.log(err))
  }, [])

  return (
    <Select onValueChange={onChangeHandler} defaultValue={value}>
      <SelectTrigger className="select-field">
        <SelectValue placeholder="Event Category" />
      </SelectTrigger>

      <SelectContent>
        {categories?.length > 0 &&
          categories?.map((category) => (
            <SelectItem
              key={category._id}
              value={category._id}
              className="p-regular-14 select-item"
            >
              {category.name}
            </SelectItem>
          ))}
        <AlertDialog>
          <AlertDialogTrigger className="p-medium-14 flex w-full rounded-sm py-3 pl-8 italic text-primary-500 hover:bg-primary-50 focus:text-primary-500">
            Create new category
          </AlertDialogTrigger>

          <AlertDialogContent className="bg-white">
            <AlertDialogHeader>
              <AlertDialogTitle>New Category</AlertDialogTitle>
              <AlertDialogDescription>
                <Input
                  type="text"
                  onChange={(e) => setNewCategories(e.target.value)}
                  value={newCategories}
                  className="input-field mt-3"
                  placeholder="Category Name"
                ></Input>
              </AlertDialogDescription>
            </AlertDialogHeader>

            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => startTransition(handleAddCategory)}
              >
                Add
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </SelectContent>
    </Select>
  )
}
export default Dropdown
