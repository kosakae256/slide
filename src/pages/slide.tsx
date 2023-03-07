import { useEffect, useState } from 'react';
import { IoCaretForward } from "react-icons/io5";
import { IoCaretBack } from "react-icons/io5";
import Chat from '../components/Chat';
import { RxHamburgerMenu } from "react-icons/rx";
import { useChannel } from '../hooks/AblyReactEffect';

const maxPage = 55

const PdfPage = () => {
  const [page, setPage] = useState(0);
  const [imgs, setImgs] = useState<string[]>([]);
  const [isDrawerOpen, setIsDrawer] = useState<boolean>(false);
  const [receivedMessages, setReceivedMessages] = useState([]);

  useEffect(() => {
    const tmpImgs = [];
    for (let i = 0; i < maxPage; i++) {
      tmpImgs.push(`/figma_slide/slide${i + 1}.png`);
    }
    setImgs(tmpImgs);
  }, []);

  const handleKeyDown = (event: KeyboardEvent) => {
    console.log("a")
    // Enterキーの場合処理を行う
    if (event.key === 'Enter') {
      setPage((rev) => rev + 1);
    }
    if (event.key === 'Backspace') {
      setPage((rev) => rev + -1);
    }
  }

  const [channel, ably] = useChannel("chat-demo", (message) => {
    const history = receivedMessages.slice(-199);
    setReceivedMessages([...history, message]);
    console.log(message);
  });

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown, false)
  }, [])

  return (
    <>
      <div className="w-screen h-screen flex flex-row items-center justify-center relative drawer drawer-mobile">
        <SideBar imgs={imgs} page={page} setPage={setPage} isDrawerOpen={isDrawerOpen} />
        <button className="w-12 h-12 absolute left-2 top-2 z-20 bg-black bg-opacity-50 rounded-full flex items-center justify-center" onClick={() => setIsDrawer((rev) => (!rev))}>
          <RxHamburgerMenu className="h-8 w-8 text-white" />
        </button>
        <img src={imgs[page]} className="h-full w-2 flex-auto object-contain" />
        <div className="h-full w-full absolute z-10 flex flex-col flex-wrap">
          {receivedMessages.map((v, i) => {
            var a = Math.floor(Math.random() * (2 + 1 - 0)) + 0

            if (i % 3 == 0) {
              return (
                <div className={`animate-push text-xl fixed top-8 w-full`} key={i}>
                  <p>{v.data}</p>
                </div>
              )
            }
              if (i % 5== 1) {
                return (
                  <div className={`animate-push text-xl fixed top-16 w-full`} key={i}>
                    <p>{v.data}</p>

                  </div>
                )
              }

              if (i % 5 == 2) {
                return (
                  <div className={`animate-push text-xl fixed top-24 w-full`} key={i}>
                    <p>{v.data}</p>

                  </div>
                )
              }
              if (i % 5 == 3) {
                return (
                  <div className={`animate-push text-xl fixed top-32 w-full`} key={i}>
                    <p>{v.data}</p>

                  </div>
                )
              }
              if (i % 5 == 4) {
                return (
                  <div className={`animate-push text-xl fixed top-40 w-full`} key={i}>
                    <p>{v.data}</p>

                  </div>
                )
              }
              return (<></>)
          })}
        </div>

      </div>
    </>
  )
};

const SideBar = ({ imgs, page, setPage, isDrawerOpen }) => {

  const pageChange = (page) => {
    if (page >= 0 && page < maxPage) {
      setPage(page);
    }
  }

  return (
    <>
      <ul className={`w-40 h-full bg-white flex flex-col space-y-2 px-4 pt-16 pb-8 overflow-y-auto ${!isDrawerOpen && "hidden"}`}>
        {imgs.map((v, i) => {
          return (
            <li className={`border w-full h-auto relative ${i == page && "border-theme border-2"} hover:border-2 hover:border-gray-500`} onClick={() => pageChange(i)} key={v}>
              <img src={v} />
              <p className="absolute bottom-0 right-1">{i + 1}</p>
            </li>
          )
        })}
      </ul>
    </>
  )
};

export default PdfPage;