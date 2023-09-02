import { useEffect } from "react";
import { PageDetails } from "../Tranquil/PageContext";
import "./Community.css";
import logo from "../../../Assets/brand_gold.svg";

function Community() {
    var { setCurrentPage } = PageDetails();
    useEffect(() => {
        setCurrentPage("community");
    });

    return (
        <div className="Community">
            <img src={logo} alt="" />
            <p>
                Tranquil is developing an interface where users can all interact
                together.
            </p>
            <p>In the meantime, do well to explore other parts of the app.</p>
        </div>
    );
}

export default Community;
