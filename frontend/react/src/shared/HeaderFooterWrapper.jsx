import Footer from "../components/Footer.jsx";
import Header from "../components/Header.jsx";

export default function HeaderFooterWrapper({children}){
    return(
        <>
            <Header/>
            {children}
            <Footer/>
        </>
    )
}