export default function Footer() {
   
    return (
        <footer>
            <div className=" p-2 border-t text-gray-500 mt-32">
                <div className=" mx-auto flex flex-col text-center py-1 px-4 md:flex-row  md:justify-between md:px-8">
                    <span>&copy; 2024 All rights reserved</span>
                    <div className="flex gap-5">
                        <h4><a href="privacy-policy" target="_blank">Privacy policy</a></h4>
                        <h4><a href="terms-conditions" target="_blank">Terms & conditions</a></h4>
                    </div>
                </div>
            </div>

        

        </footer>
    );
  }

  