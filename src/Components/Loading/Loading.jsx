import { MagnifyingGlass } from "react-loader-spinner";

export default function Loading({ isLoading}) {
    const styleLoading = {
        width:"100%",
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        marginTop:'20px'
    }
    return (
        <div className="loading-screen" style={styleLoading}>
            <MagnifyingGlass
                visible={isLoading}
                height="100"
                width="100"
                ariaLabel="magnifying-glass-loading"
                wrapperStyle={{}}
                wrapperClass="magnifying-glass-wrapper"
                glassColor="#ffffffff"
                color="#FFCC00"
            />
        </div>
    )
}