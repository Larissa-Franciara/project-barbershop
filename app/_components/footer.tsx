const Footer = () => {
    return ( 
        <div className="flex justify-center w-full bg-secondary py-6 px-5">
            <p className="text-gray-400 text-xs font-bold opacity-75">
                &copy; {new Date().getFullYear()} - FWS Barber. Todos os direitos reservados.
            </p>

        </div>
     );
}
 
export default Footer;