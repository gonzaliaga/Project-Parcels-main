/* eslint-disable @next/next/no-img-element */
"use client"
import { useAppSession } from "@/app/hook"
import Card from "@/components/Card/Card"
import { useGetUsersQuery } from "@/redux/services/userApi"

export default function Wishes() {

  const { user } = useAppSession()
  const refetchUser = useGetUsersQuery({ name: "" })
  const { data } = useGetUsersQuery({ name: "" })
  const dataUser = data?.find((el) => el.email === user?.email)

  if (dataUser?.wishes) {
    const { wishes } = dataUser
    return (
      <>
        {
          wishes.map((wish) => <Card key={wish._id} name={wish.name} precio={wish.price} superficie={wish.area} image={wish.image[0]} id={wish._id} /> )
        }
      </>
    )
  }
}
