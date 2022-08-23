import React from 'react'

export const yesterdayISO = () => {
    const todaysDate = new Date()
    const yesterday = todaysDate.setDate(todaysDate.getDate() - 1)
    const convertDate = new Date(yesterday).toISOString().slice(0, 10)
  return convertDate
}
