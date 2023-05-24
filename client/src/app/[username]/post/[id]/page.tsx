'use client'

import Avatar from '@/components/Avatar'
import Button from '@/components/Button'
import IconButton from '@/components/IconButton'
import PostItem from '@/components/PostItem'
import TextArea from '@/components/TextArea'
import { useEffect, useState } from 'react'
import { FaRegHeart } from 'react-icons/fa'

type Props = {
  params: { id: string }
}

export default function PostPage({ params: { id } }: Props) {
  useEffect(() => console.log(id), [])

  return (
    <div className="flex flex-col">
      <PostItem
        post={{
          id: '1234',
          userId: '1234',
          text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.',
          createdAt: 'today',
          commentIds: [],
          likeIds: [],
        }}
      />

      <p className="m-2 text-2xl">Comments</p>

      <div className="flex flex-col m-2 border rounded-md">
        <TextArea placeholder="Write a comment..." className="grow m-2" />

        <div className="flex grow justify-end">
          <Button className="m-2">Comment</Button>
        </div>
      </div>

      <div className="flex flex-col m-2 border rounded-md">
        <div className="flex">
          <Avatar username="Nathen20" className="m-2" />

          <div className="grow">
            <p className="m-2">
              <span className="font-bold">Nathen20</span> 1 day ago
            </p>

            <p className="m-2 mt-0 grow">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Itaque
              natus dicta cumque quod ipsa veritatis rem quidem ducimus iusto
              ratione.
            </p>
          </div>
        </div>

        <div className="flex grow justify-end m-2">
          <IconButton icon={FaRegHeart} className="m-2" />
        </div>
      </div>
    </div>
  )
}
