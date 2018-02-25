import React from 'react'
import moment from 'moment'
import TextField from 'material-ui/TextField'
import { MenuItem } from 'material-ui/Menu'
import Text from '../jellyfish/Text'

const styles = {
  price: {
    verticalAlign: 'middle',
    strike: {
      color: '#ff4632',
      textDecoration: 'line-through',
      fontStyle: 'italic',
    },
  },
}

const Ticket = ({
  id,
  name,
  start_date,
  end_date,
  price,
  discount_price,
  quantity,
  quantity_sold,
  status,
  min_quantity,
  max_quantity,
  value,
  selectTicket,
  disabled,
}) => {
  if (status === 'closed' || status === 'hidden') {
    return false
  }

  const availableTickets = quantity - quantity_sold
  const maxTickets = max_quantity === 0 ? availableTickets : max_quantity

  const displayPrice = Number(price) === 0 ? 'Free' : `$${price}`
  const displayDate = getDisplayDate(start_date, end_date)
  const discountPrice = discount_price ? discount_price : ''

  return (
    <div className="flex items-center">
      <div className="col pr2">
        <TextField
          id={id}
          select
          className="ml-auto"
          value={value}
          margin="dense"
          onChange={ev => selectTicket(ev.target.value, id)}
          disabled={disabled}
        >
          {renderMenuItems(maxTickets, min_quantity)}
        </TextField>
      </div>
      <div className="col flex-auto">
        <Text type="subheading">{name}</Text>
        <Text color="muted">All Dates - VIP Meet & Greet, Reserved Seating</Text>
      </div>
      <div className="col">
        <Text type="subheading">{displayPrice}</Text>
        <Text>{discountPrice}</Text>
      </div>
    </div>
  )
}

export default Ticket

const getDisplayDate = (start_date, end_date) => {
  if (start_date === end_date) {
    return moment(start_date).format('MMM DD, YYYY')
  } else {
    return `${moment(start_date).format('MMM DD')} - ${moment(end_date).format(
      'MMM DD, YYYY',
    )}`
  }
}

const renderMenuItems = (maxTickets, min_quantity) => {
  let arr = [0]
  for (let i = 0; i < maxTickets; i++) {
    if (min_quantity <= i && 10 > i) {
      arr.push(i + 1)
    }
  }
  return arr.map(i => (
    <MenuItem key={i} value={i} style={{ minWidth: 36 }}>
      {i}
    </MenuItem>
  ))
}
