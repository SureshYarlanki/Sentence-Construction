import { Link } from "react-router-dom";

const HomePage = () => {
  const data = [
    {
      heading: "Time Per Question",
      value: "30 sec",
    },
    {
      heading: "Total Questions",
      value: "10",
    },
    {
      heading: "Coins",
      value: "0",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-lg p-8 max-w-2xl w-full">
        <h1 className="text-3xl font-bold text-center text-blue-600 mb-4">
          Sentence Construction
        </h1>
        <p className="text-gray-700 mb-8 text-center">
          Select the correct words to complete the sentence by arranging the
          provided options in the right order.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          {data.map((item, index) => (
            <div
              key={index}
              className="bg-blue-100 text-blue-800 p-4 rounded-xl text-center shadow-sm"
            >
              <h3 className="text-sm font-medium">{item.heading}</h3>
              <p className="text-lg font-bold">{item.value}</p>
            </div>
          ))}
        </div>

        <div className="flex justify-center">
          <Link
            to="/test"
            className="bg-blue-600 text-white px-6 py-3 rounded-xl text-lg font-medium hover:bg-blue-700 transition duration-300"
          >
            Start Test
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
