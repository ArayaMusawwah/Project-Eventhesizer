import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { ICategory } from '@/lib/database/models/category.model'
import { startTransition, useState } from 'react'
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

type Props = {
  onChangeHandler?: (value: string) => void
  value?: string
}

const Dropdown = ({ onChangeHandler, value }: Props) => {
  const [categories, setCategories] = useState<ICategory[]>([
    { _id: '1', name: 'Category 1' }
  ])
  const [newCategories, setNewCategories] = useState<string>()

  const handleAddCategory = () => {
    console.log('anjnig')
  }

  return (
    <Select>
      <SelectTrigger className="select-field">
        <SelectValue placeholder="Event Category" />
      </SelectTrigger>
      <SelectContent>
        {categories?.length > 0 &&
          categories?.map((category) => (
            <SelectItem
              key={category._id}
              value={category.name}
              className="p-regular-14 select-item"
            >
              {category.name}
            </SelectItem>
          ))}

        <AlertDialog>
          <AlertDialogTrigger className="p-medium-14 flex w-full rounded-sm py-3 pl-8 text-primary-500 hover:bg-primary-50 focus:text-primary-500">
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
