import {Section} from "./Section"
import {SocialIcons} from "./SocialIcons"
export const Contact = () => {
  return (
    <Section >
      <h1 className="text-2xl md:text-6xl font-extrabold leading-snug">Contact Me</h1>
      <div className="grid sm:grid-cols-2 items-start gap-16 p-10 max-w-4xl">
        <form className="ml-auto space-y-4">
          <input
            type="text"
            placeholder="Name"
            className="w-full rounded-md py-3 px-4  border  border-black bg-gray-100 text-gray-800 text-sm outline-slate-800 transition duration-300 focus:bg-transparent"
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full rounded-md py-3 px-4  border  border-black bg-gray-100 text-gray-800 text-sm outline-slate-800 transition duration-300 focus:bg-transparent"
          />
          <input
            type="text"
            placeholder="Subject"
            className="w-full rounded-md py-3 px-4  border  border-black bg-gray-100 text-gray-800 text-sm outline-slate-800 transition duration-300 focus:bg-transparent"
          />
          <textarea
            placeholder="Message"
            rows="6"
            className="w-full rounded-md px-4  border  border-black bg-gray-100 text-gray-800 text-sm pt-3 outline-slate-800 focus:bg-transparent"
          ></textarea>
          <button
            className="border border-black bg-slate-800 text-white rounded-lg hover:bg-slate-950 
                 transition duration-500 tracking-wide  text-sm px-4 py-3 w-full !mt-6"
          >
            Send
          </button>
        </form>
        <div>
          <div className="mt-12">
            <h2 className=" text-base font-bold">Email</h2>
            <ul className="mt-4">
              <li className="flex items-center">
                <a href="mailto:merve.keskin.sen@gmail.com">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="25"
                    height="25"
                    fill="currentColor"
                    className="hover:text-gray-900 hover:scale-110 hover:-rotate-12 cursor-pointer transition duration-500 sticky z-50"
                    viewBox="0 0 16 16"
                  >
                    <path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414zM0 4.697v7.104l5.803-3.558zM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586zm3.436-.586L16 11.801V4.697z" />
                  </svg>
                </a>

                <a
                  href="mailto:merve.keskin.sen@gmail.com"
                  className=" text-sm ml-4"
                >
                  <small className="block">Mail</small>
                  <strong>merve.keskin.sen@gmail.com</strong>
                </a>
              </li>
            </ul>
          </div>

          <div className="mt-12">
            <h2 className="text-gray-800 text-base font-bold">Socials</h2>

            <div className="flex mt-4">
              <SocialIcons />
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
};