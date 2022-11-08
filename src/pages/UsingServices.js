import React from "react";
import { ServiceBlock } from "../components/ServiceBlock"
import "./styles/UsingServices.css"

class UsingServices extends React.Component {

    render() {
        return (
            <div>
                <h2>Using services in the Czech Republic</h2>
                <div className="using-services-parent">
                    {/*Placeholders*/}
                    <ServiceBlock title="Using the Tram" description="This video shows you how to use the tram system in Prague" />
                    <ServiceBlock title="Using the Metro" description="This video shows you how to use the metro system in Prague" />
                    <ServiceBlock title="Using the Bus" description="This video shows you how to use the Bus system in Prague" />
                    <ServiceBlock title="Ordering at a Cafe" description="This video shows you how to order at a cafe." />

                </div>
            </div>
        )
    }

}

export default UsingServices;