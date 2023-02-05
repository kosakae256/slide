import { useEffect, useState } from 'react';
import Title from '../components/Title';
import { IoCaretForward } from "react-icons/io5";
import { IoCaretBack } from "react-icons/io5";
import Peer from 'skyway-js'
import { useChannel } from '../hooks/AblyReactEffect';
import Chat from '../components/Chat';

const maxPage = 5

const PdfPage = () => {
  const [page, setPage] = useState(0);
  const [imgs, setImgs] = useState<string[]>([]);

  useEffect(() => {
    const tmpImgs = [];
    for (let i = 0; i < maxPage; i++) {
      tmpImgs.push(`./slide/slide${i + 1}.PNG`);
    }
    setImgs(tmpImgs);
  }, []);

  const pageChange = (page) => {
    if (page >= 0 && page < maxPage) {
      setPage(page);
    }
  }

  return (
    <>
      <div className="w-screen h-screen flex flex-col">
        <div className="w-full h-16 bg-theme">
          <h2 className="h-full flex items-center text-white font-bold pl-4 text-3xl">Slide</h2>
        </div>

        <div className="w-full h-2 flex-auto flex flex-row">
          <div className="bg-white w-40 h-full flex flex-col">
            <div className="w-full h-2 flex-auto overflow-y-auto p-2 space-y-2">
              {imgs.map((v, i) => {
                return (
                  <button className={`border w-full h-auto relative ${i == page && "border-theme border-2"} hover:border-2 hover:border-gray-500`} onClick={() => pageChange(i)} key={v}>
                    <img src={v} />
                    <p className="absolute bottom-0 right-1 font-bold text-theme">{i + 1}</p>
                  </button>
                )
              })}
            </div>
            <div className="w-40 h-40 border-t flex flex-col items-center justify-center">
              <img src="qrcode.png" className="w-32 h-32" />
              <p className="font-bold">このスライドにアクセス</p>
            </div>
          </div>

          <div className="h-full w-2 flex-auto bg-gray-50 border-x relative">
            <img src={imgs[page]} className="h-full w-full object-contain border-y" />
            <button className="absolute right-0 inset-y-0 h-full hover:bg-gray-500 hover:bg-opacity-10" onClick={() => pageChange(page + 1)}>
              <IoCaretForward className="h-full text-theme" fontSize="2rem" />
            </button>
            <button className="absolute left-0 inset-y-0 h-full hover:bg-gray-500 hover:bg-opacity-10" onClick={() => pageChange(page - 1)}>
              <IoCaretBack className="h-full text-theme" fontSize="2rem" />
            </button>
          </div>

          <div className="bg-white w-80 h-full flex flex-col">
            <div className="w-full h-full">
              <Chat />
            </div>
          </div>
        </div>
      </div>
    </>

  );
};

export default PdfPage;