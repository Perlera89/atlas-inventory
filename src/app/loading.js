'use client'

import { Triangle } from 'react-loader-spinner'

export default function LoadingComponent () {
  return (
      <Triangle
        visible={true}
        height="80"
        width="80"
        color="white"
        ariaLabel="triangle-loading"
        wrapperStyle={{}}
        wrapperClass="flex justify-center items-center h-[93vh]"
      />
  )
}
