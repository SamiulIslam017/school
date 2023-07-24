


const EmptyRoute = ({ title, subTitle }) => {
    return (
        <div className="w-full , min-h-screen flex flex-col justify-center items-center gap-6">
            <img className="animate-bounce" src="https://i.ibb.co/h1JFW5s/icons8-search-144.png" />
            <h1 className="text-3xl font-bold">{title}</h1>
            <p className="text-lg font-medium">{subTitle}</p>

        </div>
    );
};

export default EmptyRoute;