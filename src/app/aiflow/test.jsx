function DynamicMessage_s1({ UI, Icons }) {
  const [selectedDate, setSelectedDate] = React.useState(new Date());

  const tasks = [
    {
      title: "Walk the Dog",
      date: new Date(),
      completed: false,
    },
    {
      title: "Water Plants",
      date: new Date(),
      completed: true,
    },
    {
      title: "Doctor Appointment",
      date: new Date(new Date().setDate(new Date().getDate() + 5)), // 5 days from now
      completed: false,
    },
  ];

  const formatDate = (date) => {
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  };

  return (
    <UI.Card className="p-6 rounded-lg shadow-md">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">Dashboard</h2>
        <UI.Button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md">
          Add Task
        </UI.Button>
      </div>

      {/* Calendar View */}
      <div className="mb-6">
        {/* ... Calendar implementation (You'll need a date picker library for this) ... */}
        {/* For simplicity, we're just showing the selected date here */}
        <p className="text-center text-gray-500">
          Selected Date: {formatDate(selectedDate)}
        </p>
      </div>

      {/* Task List */}
      <UI.Accordion type="single" collapsible className="w-full">
        {tasks
          .filter((task) => formatDate(task.date) === formatDate(selectedDate))
          .map((task, index) => (
            <UI.AccordionItem
              key={index}
              value={`item-${index}`}
              className="border-b border-gray-200 last:border-b-0"
            >
              <UI.AccordionTrigger className="flex items-center justify-between px-4 py-3">
                <span
                  className={`font-medium ${
                    task.completed
                      ? "line-through text-gray-500"
                      : "text-gray-800"
                  }`}
                >
                  {task.title}
                </span>
                <Icons.CheckCircle2
                  className={`w-5 h-5 ${
                    task.completed ? "text-green-500" : "text-gray-400"
                  }`}
                />
              </UI.AccordionTrigger>
              <UI.AccordionContent className="px-4 py-2">
                {/* You can add task details, notes, or editing options here */}
                <p className="text-sm text-gray-600">
                  Due: {formatDate(task.date)}
                </p>
              </UI.AccordionContent>
            </UI.AccordionItem>
          ))}
      </UI.Accordion>
    </UI.Card>
  );
}

// function DynamicMessage({ UI, Icons }) {
//   const [selectedDate, setSelectedDate] = React.useState(new Date());

//   const tasks = [
//     {
//       title: "Walk the Dog",
//       date: new Date(),
//       completed: false,
//     },
//     {
//       title: "Water Plants",
//       date: new Date(),
//       completed: true,
//     },
//     {
//       title: "Doctor Appointment",
//       date: new Date(new Date().setDate(new Date().getDate() + 5)), // 5 days from now
//       completed: false,
//     },
//   ];

//   const formatDate = (date) => {
//     return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
//   };

//   return (
//     <UI.Card className="p-6 rounded-lg shadow-md">
//       {/* Header */}
//       <div className="flex items-center justify-between mb-6">
//         <h2 className="text-2xl font-semibold text-gray-800">Dashboard</h2>
//         <UI.Button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md">
//           Add Task
//         </UI.Button>
//       </div>

//       {/* Calendar View */}
//       <div className="mb-6">
//         {/* ... Calendar implementation (You'll need a date picker library for this) ... */}
//         {/* For simplicity, we're just showing the selected date here */}
//         <p className="text-center text-gray-500">
//           Selected Date: {formatDate(selectedDate)}
//         </p>
//       </div>

//       {/* Task List */}
//       <UI.Accordion type="single" collapsible className="w-full">
//         {tasks
//           .filter((task) => formatDate(task.date) === formatDate(selectedDate))
//           .map((task, index) => (
//             <UI.Accordion.Item
//               key={index}
//               value="ff"
//               className="border-b border-gray-200 last:border-b-0"
//             >
//               <UI.Accordion.Header className="flex items-center justify-between px-4 py-3">
//                 <span className="bg-green-500">{task.title}</span>
//                 <Icons.CheckCircle2 className="text-lime-800" />
//               </UI.Accordion.Header>
//               <UI.Accordion.Content className="px-4 py-2">
//                 {/* You can add task details, notes, or editing options here */}
//                 <p className="text-sm text-gray-600">
//                   Due: {formatDate(task.date)}
//                 </p>
//               </UI.Accordion.Content>
//             </UI.Accordion.Item>
//           ))}
//       </UI.Accordion>
//     </UI.Card>
//   );
// }

// -------------------------------------------------------
// CASE 2
// -------------------------------------------------------

// function DynamicMessage({ UI, Icons }) {
//   const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
//   const [selectedDay, setSelectedDay] = React.useState(new Date().getDay()); // Start with current day

//   const [todos, setTodos] = React.useState({
//     0: [
//       { task: 'Feed Seeds & Nuts', duration: 30, color: 'emerald' },
//       { task: 'Water Refill', duration: 15, color: 'blue' },
//       { task: 'Free Fly Time', duration: 60, color: 'sky' },
//       { task: 'Playtime', duration: 45, color: 'yellow' },
//     ],
//     1: [
//       { task: 'Language Practice', duration: 30, color: 'indigo' },
//       { task: 'Feed Fruits', duration: 20, color: 'rose' },
//       { task: 'Water Refill', duration: 15, color: 'blue' },
//       { task: 'Nap Time', duration: 60, color: 'gray' },
//       { task: 'Playtime', duration: 45, color: 'yellow' },
//     ],
//     // ... Add todos for other days
//   });

//   const [newTodo, setNewTodo] = React.useState('');
//   const [newTodoDuration, setNewTodoDuration] = React.useState(30);

//   const handleAddTodo = () => {
//     if (newTodo.trim() !== "") {
//       setTodos(prevTodos => ({
//         ...prevTodos,
//         [selectedDay]: [
//           ...prevTodos[selectedDay],
//           { task: newTodo, duration: newTodoDuration, color: 'indigo' }
//         ]
//       }));
//       setNewTodo('');
//       setNewTodoDuration(30);
//     }
//   };

//   const handleDeleteTodo = (index) => {
//     const updatedTodos = [...todos[selectedDay]];
//     updatedTodos.splice(index, 1);
//     setTodos(prevTodos => ({
//       ...prevTodos,
//       [selectedDay]: updatedTodos,
//     }));
//   };

//   const totalTime = todos[selectedDay].reduce((sum, todo) => sum + todo.duration, 0);

//   return (
//     <div className="p-4 md:p-10 space-y-4">
//       <UI.Card className="p-4">
//         <h2 className="text-2xl font-bold text-center mb-4">Parakram's Day Planner</h2>

//         <div className="flex flex-col md:flex-row gap-4">
//           {/* Day Selection Panel */}
//           <div className="md:w-1/3">
//             <h3 className="text-lg font-semibold mb-2">Select Day:</h3>
//             <div className="grid grid-cols-2 md:grid-cols-1 gap-2">
//               {daysOfWeek.map((day, index) => (
//                 <UI.Button
//                   key={index}
//                   className={`p-3 rounded-md text-center ${selectedDay === index ? 'bg-blue-500 text-white' : 'bg-gray-100'}`}
//                   onClick={() => setSelectedDay(index)}
//                 >
//                   {day}
//                 </UI.Button>
//               ))}
//             </div>
//           </div>

//           {/* To-Do List Panel */}
//           <div className="md:w-1/3 space-y-4">
//             <h3 className="text-lg font-semibold mb-2">Parakram's Schedule - {daysOfWeek[selectedDay]}</h3>
//             {todos[selectedDay].map((todo, index) => (
//               <UI.Alert
//                 key={index}
//                 className="flex items-center justify-between bg-[#ECEDEE]"
//               >
//                 <div className="flex items-center">
//                   <span className={`w-2 h-2 rounded-full mr-2`}
//                       style={{ backgroundColor: `#${todo.color}500` }}
//                     ></span>
//                   <p>{todo.task} - {todo.duration} mins</p>
//                 </div>
//                 <Icons.X
//                   className="cursor-pointer hover:text-red-500"
//                   onClick={() => handleDeleteTodo(index)}
//                 />
//               </UI.Alert>
//             ))}

//             <div className="flex space-x-2">
//               <UI.Input
//                 className="flex-grow"
//                 placeholder="Add new task"
//                 value={newTodo}
//                 onChange={(e) => setNewTodo(e.target.value)}
//               />
//               <UI.Input
//                 type="number"
//                 className="w-20"
//                 min="15"
//                 value={newTodoDuration}
//                 onChange={(e) => setNewTodoDuration(Number(e.target.value))}
//               />
//               <UI.Button onClick={handleAddTodo}>Add</UI.Button>
//             </div>
//           </div>

//           {/* Pie Chart Panel (Illustrative - Would need a charting library for implementation) */}
//           <div className="md:w-1/3">
//             <h3 className="text-lg font-semibold mb-2">Time Breakdown</h3>
//             <div className="h-64 bg-gray-200 rounded-lg flex items-center justify-center">
//               {/* Replace with actual Pie Chart */}
//               <p>Total Time: {totalTime} minutes</p>
//             </div>
//           </div>
//         </div>
//       </UI.Card>
//     </div>
//   );
// }

// function DynamicMessage({ UI, Icons }) {
//   const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
//   const [selectedDay, setSelectedDay] = React.useState(new Date().getDay()); // Start with current day

//   const [todos, setTodos] = React.useState({
//     0: [
//       { task: 'Feed Seeds & Nuts', duration: 30, color: 'emerald' },
//       { task: 'Water Refill', duration: 15, color: 'blue' },
//       { task: 'Free Fly Time', duration: 60, color: 'sky' },
//       { task: 'Playtime', duration: 45, color: 'yellow' },
//     ],
//     1: [
//       { task: 'Language Practice', duration: 30, color: 'indigo' },
//       { task: 'Feed Fruits', duration: 20, color: 'rose' },
//       { task: 'Water Refill', duration: 15, color: 'blue' },
//       { task: 'Nap Time', duration: 60, color: 'gray' },
//       { task: 'Playtime', duration: 45, color: 'yellow' },
//     ],
//     // ... Add todos for other days
//   });

//   const [newTodo, setNewTodo] = React.useState('');
//   const [newTodoDuration, setNewTodoDuration] = React.useState(30);

//   const handleAddTodo = () => {
//     if (newTodo.trim() !== "") {
//       setTodos(prevTodos => ({
//         ...prevTodos,
//         [selectedDay]: [
//           ...prevTodos[selectedDay],
//           { task: newTodo, duration: newTodoDuration, color: 'indigo' }
//         ]
//       }));
//       setNewTodo('');
//       setNewTodoDuration(30);
//     }
//   };

//   const handleDeleteTodo = (index) => {
//     const updatedTodos = [...todos[selectedDay]];
//     updatedTodos.splice(index, 1);
//     setTodos(prevTodos => ({
//       ...prevTodos,
//       [selectedDay]: updatedTodos,
//     }));
//   };

//   const totalTime = todos[selectedDay].reduce((sum, todo) => sum + todo.duration, 0);

//   return (
//     <div className="p-4 md:p-10 space-y-4">
//       <UI.Card className="p-4">
//         <h2 className="text-2xl font-bold text-center mb-4">Parakram's Day Planner</h2>

//         <div className="flex flex-col md:flex-row gap-4">
//           {/* Day Selection Panel */}
//           <div className="md:w-1/3">
//             <h3 className="text-lg font-semibold mb-2">Select Day:</h3>
//             <div className="grid grid-cols-2 md:grid-cols-1 gap-2">
//               {daysOfWeek.map((day, index) => (
//                 <UI.Button
//                   key={index}
//                   className={`p-3 rounded-md text-center ${selectedDay === index ? 'bg-blue-500 text-white' : 'bg-gray-100'}`}
//                   onClick={() => setSelectedDay(index)}
//                 >
//                   {day}
//                 </UI.Button>
//               ))}
//             </div>
//           </div>

//           {/* To-Do List Panel */}
//           <div className="md:w-1/3 space-y-4">
//             <h3 className="text-lg font-semibold mb-2">Parakram's Schedule - {daysOfWeek[selectedDay]}</h3>
//             {todos[selectedDay].map((todo, index) => (
//               <UI.Alert
//                 key={index}
//                 className="flex items-center justify-between bg-[#ECEDEE]"
//               >
//                 <div className="flex items-center">
//                   <span className={`w-2 h-2 rounded-full mr-2`}
//                       style={{ backgroundColor: `#${todo.color}500` }}
//                     ></span>
//                   <p>{todo.task} - {todo.duration} mins</p>
//                 </div>
//                 <Icons.X
//                   className="cursor-pointer hover:text-red-500"
//                   onClick={() => handleDeleteTodo(index)}
//                 />
//               </UI.Alert>
//             ))}

//             <div className="flex space-x-2">
//               <UI.Input
//                 className="flex-grow"
//                 placeholder="Add new task"
//                 value={newTodo}
//                 onChange={(e) => setNewTodo(e.target.value)}
//               />
//               <UI.Input
//                 type="number"
//                 className="w-20"
//                 min="15"
//                 value={newTodoDuration}
//                 onChange={(e) => setNewTodoDuration(Number(e.target.value))}
//               />
//               <UI.Button onClick={handleAddTodo}>Add</UI.Button>
//             </div>
//           </div>

//           {/* Pie Chart Panel (Illustrative - Would need a charting library for implementation) */}
//           <div className="md:w-1/3">
//             <h3 className="text-lg font-semibold mb-2">Time Breakdown</h3>
//             <div className="h-64 bg-gray-200 rounded-lg flex items-center justify-center">
//               {/* Replace with actual Pie Chart */}
//               <p>Total Time: {totalTime} minutes</p>
//             </div>
//           </div>
//         </div>
//       </UI.Card>
//     </div>
//   );
// }

// function DynamicMessage({ UI, Icons }) {
//   const { Button, Card, CardContent, CardHeader, CardTitle, CardDescription } = UI;
//   const { HeartCrack, Dumbbell, Running } = Icons;

//   return (
//     <div className="bg-gradient-to-r from-blue-400 to-purple-500 min-h-screen flex flex-col items-center justify-center p-8">
//       <Card className="w-full max-w-md bg-white shadow-md rounded-lg overflow-hidden">
//         <CardHeader className="bg-indigo-600 py-4 px-6 flex items-center">
//           <Heartbeat className="text-white mr-2 h-6 w-6" />
//           <CardTitle className="text-white text-lg font-semibold">My Fitness Dashboard</CardTitle>
//         </CardHeader>
//         <CardContent className="py-6 px-8">
//           <div className="mb-6">
//             <Card className="bg-gradient-to-r from-green-400 to-blue-500 rounded-lg p-6 transform transition duration-300 hover:scale-105">
//               <a href="#" className="flex items-center text-white">
//                 <Dumbbell className="mr-2 h-6 w-6" />
//                 <div>
//                   <CardTitle className="text-lg font-semibold">Workout Routine</CardTitle>
//                   <CardDescription className="text-sm">View and manage your workout plan</CardDescription>
//                 </div>
//               </a>
//             </Card>
//           </div>
//           <div className="mb-6">
//             <Card className="bg-gradient-to-r from-yellow-400 to-orange-500 rounded-lg p-6 transform transition duration-300 hover:scale-105">
//               <a href="#" className="flex items-center text-white">
//                 <Running className="mr-2 h-6 w-6" />
//                 <div>
//                   <CardTitle className="text-lg font-semibold">Track Your Progress</CardTitle>
//                   <CardDescription className="text-sm">Log your activities and monitor your fitness journey</CardDescription>
//                 </div>
//               </a>
//             </Card>
//           </div>
//           <Button className="bg-pink-500 hover:bg-pink-600 text-white font-semibold py-3 px-6 rounded-lg">
//             Get Started
//           </Button>
//         </CardContent>
//       </Card>
//     </div>
//   )
// }

// function DynamicMessage({ UI, Icons }) {
//   const { Button, Card, CardContent, CardHeader, CardTitle, CardDescription } = UI;

//   return (
//     <div className="bg-gradient-to-r from-blue-400 to-purple-500 min-h-screen flex flex-col items-center justify-center p-8">
//       <Card className="w-full max-w-md bg-white shadow-md rounded-lg overflow-hidden">
//         <CardHeader className="bg-indigo-600 py-4 px-6 flex items-center">
//           <CardTitle className="text-white text-lg font-semibold">My Fitness Dashboard</CardTitle>
//         </CardHeader>
//         <CardContent className="py-6 px-8">
//           <div className="mb-6">
//             <Card className="bg-gradient-to-r from-green-400 to-blue-500 rounded-lg p-6 transform transition duration-300 hover:scale-105">
//               <a href="#" className="flex items-center text-white">
//                 <div>
//                   <CardTitle className="text-lg font-semibold">Workout Routine</CardTitle>
//                   <CardDescription className="text-sm">View and manage your workout plan</CardDescription>
//                 </div>
//               </a>
//             </Card>
//           </div>
//           <div className="mb-6">
//             <Card className="bg-gradient-to-r from-yellow-400 to-orange-500 rounded-lg p-6 transform transition duration-300 hover:scale-105">
//               <a href="#" className="flex items-center text-white">
//                 <div>
//                   <CardTitle className="text-lg font-semibold">Track Your Progress</CardTitle>
//                   <CardDescription className="text-sm">Log your activities and monitor your fitness journey</CardDescription>
//                 </div>
//               </a>
//             </Card>
//           </div>
//           <Button className="bg-pink-500 hover:bg-pink-600 text-white font-semibold py-3 px-6 rounded-lg">
//             Get Started
//           </Button>
//         </CardContent>
//       </Card>
//     </div>
//   )
// }

// ----------------
// This component appears to be a preview or rendering of a specific content
// within an iframe. Iframes are used to embed external content or
// isolated environments within a web page.

// Iframes are commonly used for:
// 1. Embedding external content (e.g., YouTube videos, maps)
// 2. Sandboxing untrusted content
// 3. Creating isolated environments for specific functionalities
// 4. Loading content without affecting the parent page's performance

// In this case, the iframe seems to be used for previewing content,
// possibly from a different origin or a sandboxed environment.

// function IframePreview() {
//   return (
//     <div className="-mx-2 h-full min-h-0 w-[calc(100%_+_16px)] min-w-0">
//       <div className="h-full min-h-0 overflow-hidden bg-white border-alpha-200 border-t">
//         <iframe
//           allow="fullscreen; camera; microphone"
//           className="h-full w-full select-none"
//           data-origin="https://g-ihfehl3gruu.vusercontent.net"
//           id="v0-preview-GjJr1ILMv96"
//           loading="eager"
//           sandbox="allow-scripts allow-same-origin allow-forms allow-downloads allow-popups-to-escape-sandbox allow-pointer-lock"
//           src="https://g-ihfehl3gruu.vusercontent.net/p/GjJr1ILMv96?c=1&flags=1&bid=3mtTbNf"
//         />
//       </div>
//     </div>
//   );
// }

// export default IframePreview;
