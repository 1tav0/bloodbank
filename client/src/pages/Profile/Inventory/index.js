import { Button } from 'antd'
import React from 'react'
import InventoryForm from './InventoryForm'

const Inventory = () => {
    const [open, setOpen] = React.useState(false)
  return (
    <div>
        <div className="flex justify-end">
            <Button type="default" onClick={() => setOpen(true)}>
                Add Inventory
            </Button>
        </div>
        
        {open && <InventoryForm open={open} setOpen={setOpen} />}
    </div>
  )
}

export default Inventory