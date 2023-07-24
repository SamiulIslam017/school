

const SectionTitle = ({ title, subTitle, desc }) => {
    return (
        <div className="w-10/12 md:w-6/12 lg:w-6/12 mx-auto text-center mb-6 md:mb-12 lg:mb-12">
            <h1 className="text-lg md:text-2xl lg:text-2xl font-bold ">{title}</h1>
            <span className="text-orange text-2xl md:text-4xl lg:text-4xl font-bold">{subTitle}</span>
            <p className="mt-5">{desc}</p>
        </div>
    );
};

export default SectionTitle;