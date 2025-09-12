"use client";

import React, { use, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useSearchParams } from "next/navigation";

const GenerateContent = () => {

  const searchParams = useSearchParams();
  // const [link, setLink] = useState("");
  // const [linktext, setLinktext] = useState("");
  const [links, setLinks] = useState([{ link: "", linktext: "" }]);
  const [handle, setHandle] = useState(searchParams.get('handle'));
  const [picture, setPicture] = useState("");
  const [desc, setdesc] = useState("");

  const handleChange = (index, link, linktext) => {
    setLinks((initialLinks) => {
      return initialLinks.map((item, i) => {
        if (i == index) {
          return { link, linktext };
        } else {
          return item;
        }
      });
    });
  };

  const addLink = () => {
    setLinks(links.concat({ link: "", linktext: "" })); //using concat instead of push because it returns a new array
  }
  

  const submitLinks = async () => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      "links": links,
      "handle": handle,
      "picture": picture,
      "desc": desc
    });

    // console.log(raw);

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    const r = await fetch("http://localhost:3000/api/add", requestOptions);
    const result = await r.json();
    // toast(result.message);
    // setLink("");
    // setLinktext("");
    if (result.success){
        toast.success(result.message);
        setLinks([]);
        setHandle("");
        setPicture("");
        setdesc("");
    }
    else{
        toast.error(result.message);
    }
  };

  return (
    <div className="bg-[#225ac0] pt-20 min-h-screen grid grid-cols-2">
      <div className="col1  flex flex-col gap-5 justify-center items-center text-gray-900">
        <div className="flex flex-col gap-5 my-3">
          <h1 className="font-bold text-4xl">Create your BitTree</h1>
          <div className="item">
            <h2 className="font-semibold text-2xl">
              Step 1: Claim your Handle
            </h2>
            <div className="mx-4">
              <input
                value={handle || ""}
                onChange={e => {setHandle(e.target.value)}}
                className="px-4 py-2 bg-white my-2 focus:outline-blue-500 rounded-3xl"
                type="text"
                placeholder="Choose a Handle"
              />
            </div>
          </div>
          <div className="item">
            <h2 className="font-semibold text-2xl">Step 1: Add Links</h2>
            {links &&
              links.map((item, index) => {
                return (
                  <div key={index} className="mx-4">
                    <input
                      value={item.linktext || ""}
                      onChange={(e) =>
                        handleChange(index,  item.link, e.target.value,)
                      }
                      className="px-4 py-2 bg-white my-2 mx-2 focus:outline-blue-500 rounded-3xl"
                      type="text"
                      placeholder="Enter link text"
                    />
                    <input
                      value={item.link || ""}
                      onChange={(e) =>
                        handleChange(index, e.target.value, item.linktext)
                      }
                      className="px-4 py-2 bg-white my-2 mx-2 focus:outline-blue-500 rounded-3xl"
                      type="text"
                      placeholder="Enter link"
                    />
                  </div>
                );
              })}

            <button
              onClick={() => addLink()}
              className="p-5 mx-2 py-2 bg-slate-900 text-white font-bold rounded-3xl"
            >
              + Add Link
            </button>
          </div>
          <div className="item">
            <h2 className="font-semibold text-2xl">
              Step 3: Add a Picture and Description
            </h2>
            <div className="mx-4 flex flex-col">
              <input
                value={picture || ""}
                onChange={(e) => setPicture(e.target.value)}
                className="px-4 py-2 bg-white my-2 mx-2 focus:outline-blue-500 rounded-3xl"
                type="text"
                placeholder="Enter link to your Picture"
              />
              <input
                value={desc || ""}
                onChange={(e) => setdesc(e.target.value)}
                className="px-4 py-2 bg-white my-2 mx-2 focus:outline-blue-500 rounded-3xl"
                type="text"
                placeholder="Enter your description"
              />
              <button disabled={handle=="" || picture=="" || links[0].linktext === ""} onClick={()=>{submitLinks()}} className="disabled:bg-slate-500 w-fit my-4 p-5 mx-2 py-2 bg-slate-900 text-white font-bold rounded-3xl">
                Create your BitTree link
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="col2 w-full h-screen bg-[#225ac0] flex justify-center items-center">
        <img
          className="h-full object-contain"
          src="./generate.png"
          alt="Generate Your Links"
        />
        <ToastContainer />
      </div>
    </div>
  );
};

export default GenerateContent;
