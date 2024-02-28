'use client'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { NextResponse } from 'next/server'

export function useFetchProduct () {
  const [products, setProducts] = useState([])
  useEffect(() => {
    const data = async () => {
      const datas = await axios.get('http://localhost:1337/api/products').then((rest) => {
        console.log('rest.data', rest.data)
        setProducts(rest.data)
      }).catch((error) => {
        setProducts(error)
      })
    }
    data()
  }, [])
  return { products }
}
