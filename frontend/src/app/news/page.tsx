"use client"
import NewsCard from "@/components/cards/news";
import Modal from "@/components/modal/modal";
import Navbar from "@/components/semantic/Navbar";
import { useState } from "react";

export default function News() {
   const [isModalOpen, setIsModalOpen] = useState(false);
   const [commentId, setCommentId] = useState<number | null>(null);

   const closeModal = () => {
      setIsModalOpen(false);
   };

  return (
   <>
      <Navbar />
      <div className="overflow-x-hidden flex justify-center">
         <div className="mt-24 border border-gray-300 rounded-2xl w-xl flex flex-col">
            {
               Array.from({ length: 10 }, (_, index) => (
                  <NewsCard
                     key={index}
                     id={index + 1}
                     title={`News Title ${index + 1}`}
                     date={`2023-10-0${(index % 9) + 1}`}
                     imageUrl=""
                     content="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
                     reactionCount={10}
                     commentCount={5}
                     setIsModalOpen={setIsModalOpen}
                     setCommentId={setCommentId}
                  />
               ))
            }
            <Modal 
               isOpen={isModalOpen} 
               onClose={closeModal}
               title="Comments"
            >
               <div className="p-4">
                  <div className="mt-2">
                     {commentId && <p>Comments for News ID: {commentId}</p>}
                  </div>
               </div>
            </Modal>
         </div>
      </div>
   </>
  );
}
