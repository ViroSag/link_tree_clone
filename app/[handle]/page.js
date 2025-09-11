import Link from "next/link"
import clientPromise from "@/lib/mongodb"
import { notFound } from "next/navigation";

export default async function Page({ params }) {
  const { handle } = await params;

  const client = await clientPromise;
  const db = client.db("bittree");
  const collection = db.collection("links");
  const item = await collection.findOne({ handle: handle });

  if (!item){
    return notFound();
  }
  

 const item2 = {
  "_id": {
    "$oid": "68c33a2fb744b933840dbfe1"
  },
  "links": [
    {
      "link": "https://facebook.com/virosag",
      "linktext": "fb"
    },
    {
      "link": "https://instagram.com/virosag",
      "linktext": "insta"
    }
  ],
  "handle": "virosag",
  "picture": "https://www.virosag.com/images/dani2.png"
}
  return <div className="flex min-h-screen bg-purple-400 justify-center items-start py-10">
{item && <div className="photo flex flex-col justify-center items-center gap-4">
    <img className="max-w-[15vw]" src={item.picture} alt={"photo"} />
    <span className="font-bold text-xl">@{item.handle}</span>
    <span className="desc w-80 text-center">{item.desc}</span>
    <div className="links">
      {item.links.map((item, index) => {
        return <Link key={index}  href={item.link}> <div className="bg-purple-100 min-w-76 flex justify-center shadow-lg px-2 py-4 rounded-md my-3">
        {item.linktext}
        
         </div></Link>       
      })}
   
</div>
</div>}
    
  </div>
}