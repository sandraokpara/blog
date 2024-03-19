"use client"

import React, { FC, useState } from "react"

import Dialog from "../common/Dialog"
import Newsletter from "../common/Newsletter"

interface SubscriptionPopoverProps {}

const SubscriptionPopover: FC<SubscriptionPopoverProps> = ({}) => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(true)
  return isPopoverOpen ? (
    <Dialog
      variant="popover"
      toggleDialog={() => setIsPopoverOpen(!isPopoverOpen)}
    >
      <Newsletter />
    </Dialog>
  ) : (
    <></>
  )
}

export default SubscriptionPopover
