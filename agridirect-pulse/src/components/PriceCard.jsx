export const PriceCard = ({ crop, price, district, change }) => {
  const isPositive = change >= 0;

  return (
    <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition">
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="font-semibold text-lg text-gray-800">{crop}</h3>
          <p className="text-sm text-gray-500">{district}</p>
        </div>
        <span className={`px-2 py-1 rounded text-sm font-medium ${
          isPositive 
            ? 'bg-green-100 text-green-700' 
            : 'bg-red-100 text-red-700'
        }`}>
          {isPositive ? '+' : ''}{change}%
        </span>
      </div>
      <p className="text-2xl font-bold text-primary-700">₹{price}/kg</p>
    </div>
  );
};
