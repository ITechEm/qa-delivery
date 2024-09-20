export default function Footer() {
   
    return (
        <footer>
            <div className=" p-2 border-t  mt-32">
                <div className=" mx-auto flex flex-col text-center py-1 px-4 md:flex-row  md:justify-between md:px-8 inria">
                    &copy; 2024 All rights reserved
                    <div className="flex gap-5 inria">
                        <a href="privacy-policy" target="_blank">Privacy policy</a>
                        <a href="terms-conditions" target="_blank">Terms & conditions</a>
                    </div>
                </div>
            </div>

        

        </footer>
    );
  }

  