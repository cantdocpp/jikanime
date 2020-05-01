// We have to import this in order to use async await in our code
import 'regenerator-runtime'

// We import the style to the header
// It won't link to the style.css
// It will put every style on style tag and place it on our header
// This will only be applied on the dev mode, on the production we will link it to the style.css
import "./styles/style.css";

// We import all of our global component
// This is the component that will be used in more than one page
import "./components/global/navbar";
import "./components/global/search";
import "./components/global/loading";
import "./components/global/card";
import "./components/global/search-result";

// We also import page component that only scoped to that page
// This component will only be used inside that page
import "./components/pages/indexPage/top";
