const Loading = () => {
  const ballClass = 'w-4 h-4 rounded-full animate-bounce';
  const balls = [
    { delay: '-0.3s', color: 'bg-blue-500' },
    { delay: '-0.15s', color: 'bg-blue-500' },
    { delay: '0s', color: 'bg-red-500' },
  ];

  return (
    <div className="flex items-end justify-center space-x-2 h-20">
      {balls.map((ball, index) => (
        <div
          key={index}
          className={`${ballClass} ${ball.color}`}
          style={{ animationDelay: ball.delay}}
        />
      ))}
    </div>
  );
};

export default Loading;
