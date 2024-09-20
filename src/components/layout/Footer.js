export default function Footer() {
   
    return (
        <footer>
            <div className=" p-2 border-t  mt-32">
                <div className=" mx-auto flex flex-col text-center py-1 px-4 md:flex-row  md:justify-between md:px-8">
                    <p>&copy; 2024 All rights reserved</p>
                    <div className="flex gap-5">
                        <p><a href="privacy-policy" target="_blank">Privacy policy</a></p>
                        <p><a href="terms-conditions" target="_blank">Terms & conditions</a></p>
                    </div>
                </div>
            </div>

        

        </footer>
    );
  }

  