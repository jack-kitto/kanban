import { NextPage } from "next"
import React from "react"


const Project: NextPage = ({ params }: any) => {
  return (
    <div>
      {params?.slug}
    </div>
  )
}
export default Project
