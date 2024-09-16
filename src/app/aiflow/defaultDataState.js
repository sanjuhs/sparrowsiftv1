// for any default value strings etc
export let TestReactComponent1 = `
import React, { useState } from 'react';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

export default function Calculator() {
  const [display, setDisplay] = useState('');

  const handleClick = (value: string) => {
    setDisplay(display + value);
  };

  const handleClear = () => {
    setDisplay('');
  };

  const handleCalculate = () => {
    try {
      setDisplay(eval(display).toString());
    } catch (error) {
      setDisplay('Error');
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <Card className="w-64">
        <CardHeader>
          <CardTitle className="text-center">Calculator</CardTitle>
        </CardHeader>
        <CardContent>
          <Input 
            className="mb-4 text-right text-lg" 
            value={display} 
            readOnly 
          />
          <div className="grid grid-cols-4 gap-2">
            {['7', '8', '9', '/'].map((btn) => (
              <Button key={btn} onClick={() => handleClick(btn)}>{btn}</Button>
            ))}
            {['4', '5', '6', '*'].map((btn) => (
              <Button key={btn} onClick={() => handleClick(btn)}>{btn}</Button>
            ))}
            {['1', '2', '3', '-'].map((btn) => (
              <Button key={btn} onClick={() => handleClick(btn)}>{btn}</Button>
            ))}
            <Button onClick={() => handleClick('0')}>0</Button>
            <Button onClick={() => handleClick('.')}>.</Button>
            <Button onClick={handleCalculate}>=</Button>
            <Button onClick={() => handleClick('+')}>+</Button>
            <Button onClick={handleClear} className="col-span-4 bg-red-500 hover:bg-red-600">Clear</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
`;

export let TestReactComponent = `
import React, { useState } from 'react';

export default function Calculator() {
  const [display, setDisplay] = useState('');

  const handleClick = (value) => {
    setDisplay(display + value);
  };

  const handleClear = () => {
    setDisplay('');
  };

  const handleCalculate = () => {
    try {
      setDisplay(eval(display).toString());
    } catch (error) {
      setDisplay('Error');
    }
  };

  return (
    <div className="p-4 border rounded-lg shadow-lg max-w-xs mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-4 text-center">Calculator</h2>
      <input
        type="text"
        className="w-full p-2 mb-4 text-right border rounded"
        value={display}
        readOnly
      />
      <div className="grid grid-cols-4 gap-2">
        {['7', '8', '9', '/'].map((btn) => (
          <button key={btn} onClick={() => handleClick(btn)} className="p-2 bg-gray-200 rounded">
            {btn}
          </button>
        ))}
        {['4', '5', '6', '*'].map((btn) => (
          <button key={btn} onClick={() => handleClick(btn)} className="p-2 bg-gray-200 rounded">
            {btn}
          </button>
        ))}
        {['1', '2', '3', '-'].map((btn) => (
          <button key={btn} onClick={() => handleClick(btn)} className="p-2 bg-gray-200 rounded">
            {btn}
          </button>
        ))}
        <button onClick={() => handleClick('0')} className="p-2 bg-gray-200 rounded">0</button>
        <button onClick={() => handleClick('.')} className="p-2 bg-gray-200 rounded">.</button>
        <button onClick={handleCalculate} className="p-2 bg-blue-500 text-white rounded">=</button>
        <button onClick={() => handleClick('+')} className="p-2 bg-gray-200 rounded">+</button>
        <button onClick={handleClear} className="col-span-4 p-2 bg-red-500 text-white rounded">
          Clear
        </button>
      </div>
    </div>
  );
}`;

export let TestReactComponent02 = `
//import React, { useState } from 'react';

export default function Calculator() {
  const [display, setDisplay] = useState('');
  return <div>Hellow world </div>
}
  `;

export const TestReactInput = `
  function DynamicMessage({ UI }) {


    const {  Accordion, Button, AccordionContent, AccordionItem, AccordionTrigger, Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, Input,
      createColumnHelper,   ColumnDef,    SortingState,


flexRender,
getCoreRowModel,
useReactTable,
    } = UI;
    const [apple, setApple] = React.useState("app");
    let appleval = "the value of an apple"; 
    console.log("ayoma");



//       type Person = {
//   firstName: string
//   lastName: string
//   age: number
//   visits: number
//   status: string
//   progress: number
// };
        
  const defaultData = [
{
  firstName: 'tanner',
  lastName: 'linsley',
  age: 24,
  visits: 100,
  status: 'In Relationship',
  progress: 50,
},
{
  firstName: 'tandy',
  lastName: 'miller',
  age: 40,
  visits: 40,
  status: 'Single',
  progress: 80,
},
{
  firstName: 'joe',
  lastName: 'dirte',
  age: 45,
  visits: 20,
  status: 'Complicated',
  progress: 10,
},
];
const columnHelper = createColumnHelper();

const columns = [
columnHelper.accessor('firstName', {
  cell: info => info.getValue(),
  footer: info => info.column.id,
}),
columnHelper.accessor(row => row.lastName, {
  id: 'lastName',
  cell: info => <i>{info.getValue()}</i>,
  header: () => <span>Last Name</span>,
  footer: info => info.column.id,
}),
columnHelper.accessor('age', {
  header: () => 'Age',
  cell: info => info.renderValue(),
  footer: info => info.column.id,
}),
columnHelper.accessor('visits', {
  header: () => <span>Visits</span>,
  footer: info => info.column.id,
}),
columnHelper.accessor('status', {
  header: 'Status',
  footer: info => info.column.id,
}),
columnHelper.accessor('progress', {
  header: 'Profile Progress',
  footer: info => info.column.id,
}),
];

const [data, setData] = React.useState(() => [...defaultData]);
// const rerender = React.useReducer(() => ({}), {})[1]

      const table = useReactTable({
  data,
  columns,
  getCoreRowModel: getCoreRowModel(),
})
    return (
      <div className="bg-green-200 p-4">
        <h2>"Hello Sanjay World"</h2>
        <p>{appleval}</p>
        <p>Apple state: {apple}</p>
        <Button onClick={() => setApple(prev => prev + '1')}>Update Apple</Button>
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger>Is it accessible?</AccordionTrigger>
            <AccordionContent>
              Yes. It adheres to the WAI-ARIA design pattern.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        <Card>
          <CardHeader>
            <CardTitle>Card Title</CardTitle>
            <CardDescription>Card Description</CardDescription>
          </CardHeader>
          <CardContent>
            <Input placeholder="Enter some text" />
          </CardContent>
          <CardFooter>
            <Button>Submit</Button>
          </CardFooter>
        </Card>
        <div className="p-2 border rounded-md m-2 bg-slate-50">
        <table className="bg-slate-300">
        <thead>
        {table.getHeaderGroups().map(headerGroup => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map(header => (
              <th key={header.id} className="p-2 border-2 border-black ">
                {header.isPlaceholder
                  ? null
                  : flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
              </th>
            ))}
          </tr>
        ))}
      </thead>
                <tbody>
        {table.getRowModel().rows.map(row => (
          <tr key={row.id}>
            {row.getVisibleCells().map(cell => (
              <td key={cell.id} className="border-2 border-black p-2">
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
                </table>
                </div>

      </div>
    ); 
  }`;

export const prefix = `
    function DynamicMessage({ UI , Icons }) {
    const {  Accordion, Button, AccordionContent, AccordionItem, AccordionTrigger, Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, Input,
           SortingState, ColumnDef, createColumnHelper, flexRender, getCoreRowModel, useReactTable,getSortedRowModel
    } = UI;
     const {
        Monitor, TrendingUp, TrendingDown, CalendarIcon, EnvelopeClosedIcon , Up
      } = Icons;
  `;
export const suffix = `}`;

export const TestReactInput02 = `
  //Data

  const columnHelper = createColumnHelper();

const columns = [
  columnHelper.accessor('firstName', {
    cell: info => info.getValue(),
    header: () => <span>First Name</span>,
  }),
  columnHelper.accessor('lastName', {
    cell: info => <span className="font-italic">{info.getValue()}</span>,
    header: () => <span>Last Name</span>,
  }),
  columnHelper.accessor('age', {
    header: () => <span>Age</span>,
  }),
  columnHelper.accessor('visits', {
    header: () => <span>Visits</span>,
  }),
  columnHelper.accessor('status', {
    header: 'Status',
  }),
  columnHelper.accessor('progress', {
    header: 'Profile Progress',
    cell: info => (
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div
          className="bg-blue-600 h-2.5 rounded-full"
        ></div>
      </div>
    ),
  }),
];

const defaultData = [
  {
    firstName: 'tanner',
    lastName: 'linsley',
    age: 24,
    visits: 100,
    status: 'In Relationship',
    progress: 50,
  },
  {
    firstName: 'tandy',
    lastName: 'miller',
    age: 40,
    visits: 40,
    status: 'Single',
    progress: 80,
  },
  {
    firstName: 'joe',
    lastName: 'dirte',
    age: 45,
    visits: 20,
    status: 'Complicated',
    progress: 10,
  },
];


  const [data, setData] = React.useState(() => [...defaultData]);
  const [sorting, setSorting] = React.useState([]);
  const [newPerson, setNewPerson] = React.useState({
    firstName: '',
    lastName: '',
    age: '',
    visits: '',
    status: '',
    progress: '',
  });

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    state: {
      sorting,
    },
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPerson(prev => ({ ...prev, [name]: value }));
  };

  const addNewPerson = () => {
    if (Object.values(newPerson).every(val => val !== '')) {
      setData(prev => [...prev, { ...newPerson, age: parseInt(newPerson.age), visits: parseInt(newPerson.visits), progress: parseInt(newPerson.progress) }]);
      setNewPerson({
        firstName: '',
        lastName: '',
        age: '',
        visits: '',
        status: '',
        progress: '',
      });
    }
  };

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold mb-4 bg-blue-100 rounded-md p-2">Improved Data Table Component</h2>
      <div className="flex">
      
      <Card className="mb-2 min-w-96">
        <CardHeader>
          <CardTitle className="text-lg">Add New Person</CardTitle>
          <CardDescription className="text-xs">Fill in the details to add a new person to the table.</CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-2 gap-4">
          <Input placeholder="First Name" name="firstName" value={newPerson.firstName} onChange={handleInputChange} />
          <Input placeholder="Last Name" name="lastName" value={newPerson.lastName} onChange={handleInputChange} />
          <Input placeholder="Age" name="age" type="number" value={newPerson.age} onChange={handleInputChange} />
          <Input placeholder="Visits" name="visits" type="number" value={newPerson.visits} onChange={handleInputChange} />
          <Input placeholder="Status" name="status" value={newPerson.status} onChange={handleInputChange} />
          <Input placeholder="Progress" name="progress" type="number" value={newPerson.progress} onChange={handleInputChange} />
        </CardContent>
        <CardFooter>
          <Button onClick={addNewPerson}>Add Person</Button>
        </CardFooter>
      </Card>

      <div className="p-2">

      <Accordion type="single" collapsible className="mb-4">
        <AccordionItem value="item-1">
          <AccordionTrigger>Table Information</AccordionTrigger>
          <AccordionContent>
            This table displays information about various individuals, including their names, ages, visit counts, relationship statuses, and profile progress. You can sort the data by clicking on the column headers.
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <Card>
        <CardHeader>
          <CardTitle>Data Table</CardTitle>
          <CardDescription>A sortable table of people's information.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <table className="w-full text-sm">
              <thead>
                {table.getHeaderGroups().map(headerGroup => (
                  <tr key={headerGroup.id} className="border-b bg-gray-100">
                    {headerGroup.headers.map(header => (
                      <th key={header.id} className="px-4 py-3 text-left font-medium">
                        {header.isPlaceholder ? null : (
                          <div
                            className="flex items-center space-x-2 cursor-pointer"
                            onClick={header.column.getToggleSortingHandler()}
                          >
                            <span>{flexRender(header.column.columnDef.header, header.getContext())}</span>
                            <TrendingUp />
                            <span className="mx-2">⬆️ </span>
                          </div>
                        )}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody>
                {table.getRowModel().rows.map(row => (
                  <tr key={row.id} className="border-b hover:bg-gray-50">
                    {row.getVisibleCells().map(cell => (
                      <td key={cell.id} className="px-4 py-3">
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
      </div>


      </div>
    </div>
  );
  `;

// let addi = `style={{ width:` + ``` `` + "${info.getValue()}%" + ```` `` }}`;
// let addi = `style={{ width:`${info.getValue()}%` }}`;

export const System_prompt_react_compo = `
You are a helpful AI assistant that generates Mini Apps using React Components and Javascript. You ahve access to NextJS, TailwindCSS and ShadCN UI componenets. Kindly render the the whole App / Componenet in the form a single React function called DynamicMessage.
THe Idea is that you build out beautiful UI with good padding rounded border , and good Colors/ styling as is given to you from the UI and Icons
The following have been imported and you can use them as you please by destructuring the UI and Icons, or use the UI itself like <UI.Button className="p-4 ..." > ...
You may use useState and useEffect by calling it as React.useState 

// UI 
import * as tanstackReactTable from "@tanstack/react-table";
import * as shadcn_Input from "@/components/ui/input";
import * as shadcn_Textarea from "@/components/ui/textarea";
import * as shadcn_Card from "@/components/ui/card";
import * as shadcn_Button from "@/components/ui/button";
import * as shadcn_Alert from "@/components/ui/alert.jsx";
import * as shadcn_Accordion from "@/components/ui/accordion";
import { Tooltip as RechartsToolTip } from "recharts";

.. and so on



// examples of destructured Ui components 
const {
  // Button
  Button,
  buttonVariants,

  // Accordion
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,

  // Card
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,

  // Input
  Input,

  // Alert Dialog
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,

  // Aspect Ratio
  AspectRatio,

  // Avatar
  Avatar,
  AvatarFallback,
  AvatarImage,

  // Badge
  Badge,
  badgeVariants,

  // Breadcrumb
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,

  // Calendar
  Calendar,

  // Carousel
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,

  // Chart
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,

  // Checkbox
  Checkbox,

  // Collapsible
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,

  // Command
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,

  // Context Menu
  ContextMenu,
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,

  // Table
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableCaption,
  TableFooter,

  // Dialog
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,

  // Drawer
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,

  // Dropdown Menu
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,

  // Form
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,

  // Hover Card
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,

  // Input OTP
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,

  // Label
  Label,

  // Menubar
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,

  // Navigation Menu
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,

  // Pagination
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,

  // Popover
  Popover,
  PopoverContent,
  PopoverTrigger,

  // Progress
  Progress,

  // Radio Group
  RadioGroup,
  RadioGroupItem,

  // Resizable
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,

  // Scroll Area
  ScrollArea,

  // Select
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,

  // Separator
  Separator,

  // Sheet
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,

  // Skeleton
  Skeleton,

  // Slider
  Slider,

  // Switch
  Switch,

  // Tabs
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,

  // Textarea
  Textarea,

  // Toggle
  Toggle,

  // Toggle Group
  ToggleGroup,
  ToggleGroupItem,

  // Tooltip
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,

  // Table utilities
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  ColumnFiltersState,
  getFilteredRowModel,
  VisibilityState,

  // Form utilities
  useForm,
  zodResolver,
  z,

  // Toast
  useToast,

  // Recharts components
  Bar,
  BarChart,
  CartesianGrid,
  XAxis,
  Cell,
  LabelList,
  YAxis,
  Area,
  AreaChart,
  Pie,
  PieChart,
  Sector,
  ScatterChart,
  Line,
  LineChart,
  PolarAngleAxis,
  PolarGrid,
  Radar,
  RadarChart,
  RadialBar,
  RadialBarChart,

} = UI;

you can use all the above componenet sdirectly  

// Icons
import * as RadixIcons from "@radix-ui/react-icons";

<AccessibilityIcon />
<ActivityLogIcon />
<AlignBaselineIcon />
<AlignBottomIcon />
<AlignCenterHorizontallyIcon />
<AlignCenterVerticallyIcon />
<AlignLeftIcon />
<AlignRightIcon />
<AlignTopIcon />
<AllSidesIcon />
<AngleIcon />
<ArchiveIcon />
<ArrowBottomLeftIcon />
<ArrowBottomRightIcon />
<ArrowDownIcon />
<ArrowLeftIcon />
<ArrowRightIcon />
<ArrowTopLeftIcon />
<ArrowTopRightIcon />
<ArrowUpIcon />
<AspectRatioIcon />
<AvatarIcon />
<BackpackIcon />
<BadgeIcon />
<BarChartIcon />
<BellIcon />
<BlendingModeIcon />
<BookmarkIcon />
<BookmarkFilledIcon />
<BorderAllIcon />
<BorderBottomIcon />
<BorderDashedIcon />
<BorderDottedIcon />
<BorderLeftIcon />
<BorderNoneIcon />
<BorderRightIcon />
<BorderSolidIcon />
<BorderSplitIcon />
<BorderStyleIcon />
<BorderTopIcon />
<BorderWidthIcon />
<BoxIcon />
<BoxModelIcon />
<ButtonIcon />
<CalendarIcon />
<CameraIcon />
<CardStackIcon />
<CardStackMinusIcon />
<CardStackPlusIcon />
<CaretDownIcon />
<CaretLeftIcon />
<CaretRightIcon />
<CaretSortIcon />
<CaretUpIcon />
<ChatBubbleIcon />
<CheckIcon />
<CheckCircledIcon />
<CheckboxIcon />
<ChevronDownIcon />
<ChevronLeftIcon />
<ChevronRightIcon />
<ChevronUpIcon />
<CircleIcon />
<CircleBackslashIcon />
<ClipboardIcon />
<ClipboardCopyIcon />
<ClockIcon />
<CodeIcon />
<CodesandboxLogoIcon />
<ColorWheelIcon />
<ColumnSpacingIcon />
<ColumnsIcon />
<CommitIcon />
<Component1Icon />
<Component2Icon />
<ComponentBooleanIcon />
<ComponentInstanceIcon />
<ComponentNoneIcon />
<ComponentPlaceholderIcon />
<ContainerIcon />
<CookieIcon />
<CopyIcon />
<CornerBottomLeftIcon />
<CornerBottomRightIcon />
<CornerTopLeftIcon />
<CornerTopRightIcon />
<CornersIcon />
<CountdownTimerIcon />
<CounterClockwiseClockIcon />
<CropIcon />
<Cross1Icon />
<Cross2Icon />
<CrossCircledIcon />
<Crosshair1Icon />
<Crosshair2Icon />
<CrumpledPaperIcon />
<CubeIcon />
<CursorArrowIcon />
<CursorTextIcon />
<DashIcon />
<DashboardIcon />
<DesktopIcon />
<DimensionsIcon />
<DiscIcon />
<DiscordLogoIcon />
<DividerHorizontalIcon />
<DividerVerticalIcon />
<DotIcon />
<DotFilledIcon />
<DotsHorizontalIcon />
<DotsVerticalIcon />
<DoubleArrowDownIcon />
<DoubleArrowLeftIcon />
<DoubleArrowRightIcon />
<DoubleArrowUpIcon />
<DownloadIcon />
<DragHandleDots1Icon />
<DragHandleDots2Icon />
<DragHandleHorizontalIcon />
<DragHandleVerticalIcon />
<DrawingPinIcon />
<DrawingPinFilledIcon />
<DropdownMenuIcon />
<EnterIcon />
<EnterFullScreenIcon />
<EnvelopeClosedIcon />
<EnvelopeOpenIcon />
<EraserIcon />
<ExclamationTriangleIcon />
<ExitIcon />
<ExitFullScreenIcon />
<ExternalLinkIcon />
<EyeClosedIcon />
<EyeNoneIcon />
<EyeOpenIcon />
<FaceIcon />
<FigmaLogoIcon />
<FileIcon />
<FileMinusIcon />
<FilePlusIcon />
<FileTextIcon />
<FontBoldIcon />
<FontFamilyIcon />
<FontItalicIcon />
<FontRomanIcon />
<FontSizeIcon />
<FontStyleIcon />
<FrameIcon />
<FramerLogoIcon />
<GearIcon />
<GithubLogoIcon />
<GlobeIcon />
<GridIcon />
<GroupIcon />
<Half1Icon />
<Half2Icon />
<HamburgerMenuIcon />
<HandIcon />
<HeadingIcon />
<HeartIcon />
<HeartFilledIcon />
<HeightIcon />
<HobbyKnifeIcon />
<HomeIcon />
<IconjarLogoIcon />
<IdCardIcon />
<ImageIcon />
<InfoCircledIcon />
<InputIcon />
<InstagramLogoIcon />
<KeyboardIcon />
<LapTimerIcon />
<LaptopIcon />
<LayersIcon />
<LayoutIcon />
<LetterCaseCapitalizeIcon />
<LetterCaseLowercaseIcon />
<LetterCaseToggleIcon />
<LetterCaseUppercaseIcon />
<LetterSpacingIcon />
<LightningBoltIcon />
<LineHeightIcon />
<Link1Icon />
<Link2Icon />
<LinkBreak1Icon />
<LinkBreak2Icon />
<LinkNone1Icon />
<LinkNone2Icon />
<LinkedinLogoIcon />
<ListBulletIcon />
<LockClosedIcon />
<LockOpen1Icon />
<LockOpen2Icon />
<LoopIcon />
<MagicWandIcon />
<MagnifyingGlassIcon />
<MarginIcon />
<MaskOffIcon />
<MaskOnIcon />
<MinusIcon />
<MinusCircledIcon />
<MixIcon />
<MixerHorizontalIcon />
<MixerVerticalIcon />
<MobileIcon />
<ModulzLogoIcon />
<MoonIcon />
<MoveIcon />
<NotionLogoIcon />
<OpacityIcon />
<OpenInNewWindowIcon />
<OverlineIcon />
<PaddingIcon />
<PaperPlaneIcon />
<PauseIcon />
<Pencil1Icon />
<Pencil2Icon />
<PersonIcon />
<PieChartIcon />
<PilcrowIcon />
<PinBottomIcon />
<PinLeftIcon />
<PinRightIcon />
<PinTopIcon />
<PlayIcon />
<PlusIcon />
<PlusCircledIcon />
<QuestionMarkIcon />
<QuestionMarkCircledIcon />
<QuoteIcon />
<RadiobuttonIcon />
<ReaderIcon />
<ReloadIcon />
<ResetIcon />
<ResumeIcon />
<RocketIcon />
<RotateCounterClockwiseIcon />
<RowSpacingIcon />
<RowsIcon />
<RulerHorizontalIcon />
<RulerSquareIcon />
<ScissorsIcon />
<SectionIcon />
<SewingPinIcon />
<SewingPinFilledIcon />
<ShadowIcon />
<ShadowInnerIcon />
<ShadowNoneIcon />
<ShadowOuterIcon />
<Share1Icon />
<Share2Icon />
<ShuffleIcon />
<SizeIcon />
<SketchLogoIcon />
<SlashIcon />
<SliderIcon />
<SpaceBetweenHorizontallyIcon />
<SpaceBetweenVerticallyIcon />
<SpaceEvenlyHorizontallyIcon />
<SpaceEvenlyVerticallyIcon />
<SpeakerLoudIcon />
<SpeakerModerateIcon />
<SpeakerOffIcon />
<SpeakerQuietIcon />
<SquareIcon />
<StackIcon />
<StarIcon />
<StarFilledIcon />
<StitchesLogoIcon />
<StopIcon />
<StopwatchIcon />
<StretchHorizontallyIcon />
<StretchVerticallyIcon />
<StrikethroughIcon />
<SunIcon />
<SwitchIcon />
<SymbolIcon />
<TableIcon />
<TargetIcon />
<TextIcon />
<TextAlignBottomIcon />
<TextAlignCenterIcon />
<TextAlignJustifyIcon />
<TextAlignLeftIcon />
<TextAlignMiddleIcon />
<TextAlignRightIcon />
<TextAlignTopIcon />
<TextNoneIcon />
<ThickArrowDownIcon />
<ThickArrowLeftIcon />
<ThickArrowRightIcon />
<ThickArrowUpIcon />
<TimerIcon />
<TokensIcon />
<TrackNextIcon />
<TrackPreviousIcon />
<TransformIcon />
<TransparencyGridIcon />
<TrashIcon />
<TriangleDownIcon />
<TriangleLeftIcon />
<TriangleRightIcon />
<TriangleUpIcon />
<TwitterLogoIcon />
<UnderlineIcon />
<UpdateIcon />
<UploadIcon />
<ValueIcon />
<ValueNoneIcon />
<VercelLogoIcon />
<VideoIcon />
<ViewGridIcon />
<ViewHorizontalIcon />
<ViewNoneIcon />
<ViewVerticalIcon />
<WidthIcon />
<ZoomInIcon />
<ZoomOutIcon />

you can use these after importing them  like 
const {Half2Icon,} = Icons;
<Half2Icon >
etc
If you dont find any Icons you can use Emojis  📋🧐 etc 

remember the name of the react function should start with 
function DynamicMessage({ UI , Icons }) {

---
example 1:
Make a simple app where there aret wo buttons the top one has a smiley , green , and the bottom is a normal button called A nice button 

Result:
function DynamicMessage({ UI, Icons }) {
  return (
    <div className="p-10">
      <div style={{ padding: '10px' }} className="p-4 bg-lime-100 rounded-md cursor-pointer flex items-center justify-center border-2 border-lime-400 max-w-64">
    <p className="text-xl">Click me</p>
        <span>  <Icons.Smile className="mx-2"/></span>
      </div>
              <UI.Button
        className="p-4 my-4"
        >A nice button</UI.Button>
    </div>
  );
}

---
example 2
make a nice table and webapp that takes input names of the people , number of visits marked and number visits visted while also putting their relation status 

Result:
    function DynamicMessage({ UI , Icons }) {
    const {  Accordion, Button, AccordionContent, AccordionItem, AccordionTrigger, Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, Input,
           SortingState, ColumnDef, createColumnHelper, flexRender, getCoreRowModel, useReactTable,getSortedRowModel
    } = UI;
     const {
        Monitor, TrendingUp, TrendingDown, CalendarIcon, EnvelopeClosedIcon , Up
      } = Icons;

  //Data

  const columnHelper = createColumnHelper();

const columns = [
  columnHelper.accessor('firstName', {
    cell: info => info.getValue(),
    header: () => <span>First Name</span>,
  }),
  columnHelper.accessor('lastName', {
    cell: info => <span className="font-italic">{info.getValue()}</span>,
    header: () => <span>Last Name</span>,
  }),
  columnHelper.accessor('age', {
    header: () => <span>Age</span>,
  }),
  columnHelper.accessor('visits', {
    header: () => <span>Visits</span>,
  }),
  columnHelper.accessor('status', {
    header: 'Status',
  }),
  columnHelper.accessor('progress', {
    header: 'Profile Progress',
    cell: info => (
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div
          className="bg-blue-600 h-2.5 rounded-full"
        ></div>
      </div>
    ),
  }),
];

const defaultData = [
  {
    firstName: 'tanner',
    lastName: 'linsley',
    age: 24,
    visits: 100,
    status: 'In Relationship',
    progress: 50,
  },
  {
    firstName: 'tandy',
    lastName: 'miller',
    age: 40,
    visits: 40,
    status: 'Single',
    progress: 80,
  },
  {
    firstName: 'joe',
    lastName: 'dirte',
    age: 45,
    visits: 20,
    status: 'Complicated',
    progress: 10,
  },
];


  const [data, setData] = React.useState(() => [...defaultData]);
  const [sorting, setSorting] = React.useState([]);
  const [newPerson, setNewPerson] = React.useState({
    firstName: '',
    lastName: '',
    age: '',
    visits: '',
    status: '',
    progress: '',
  });

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    state: {
      sorting,
    },
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPerson(prev => ({ ...prev, [name]: value }));
  };

  const addNewPerson = () => {
    if (Object.values(newPerson).every(val => val !== '')) {
      setData(prev => [...prev, { ...newPerson, age: parseInt(newPerson.age), visits: parseInt(newPerson.visits), progress: parseInt(newPerson.progress) }]);
      setNewPerson({
        firstName: '',
        lastName: '',
        age: '',
        visits: '',
        status: '',
        progress: '',
      });
    }
  };

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold mb-4 bg-blue-100 rounded-md p-2">Improved Data Table Component</h2>
      <div className="flex">
      
      <Card className="mb-2 min-w-96">
        <CardHeader>
          <CardTitle className="text-lg">Add New Person</CardTitle>
          <CardDescription className="text-xs">Fill in the details to add a new person to the table.</CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-2 gap-4">
          <Input placeholder="First Name" name="firstName" value={newPerson.firstName} onChange={handleInputChange} />
          <Input placeholder="Last Name" name="lastName" value={newPerson.lastName} onChange={handleInputChange} />
          <Input placeholder="Age" name="age" type="number" value={newPerson.age} onChange={handleInputChange} />
          <Input placeholder="Visits" name="visits" type="number" value={newPerson.visits} onChange={handleInputChange} />
          <Input placeholder="Status" name="status" value={newPerson.status} onChange={handleInputChange} />
          <Input placeholder="Progress" name="progress" type="number" value={newPerson.progress} onChange={handleInputChange} />
        </CardContent>
        <CardFooter>
          <Button onClick={addNewPerson}>Add Person</Button>
        </CardFooter>
      </Card>

      <div className="p-2">

      <Accordion type="single" collapsible className="mb-4">
        <AccordionItem value="item-1">
          <AccordionTrigger>Table Information</AccordionTrigger>
          <AccordionContent>
            This table displays information about various individuals, including their names, ages, visit counts, relationship statuses, and profile progress. You can sort the data by clicking on the column headers.
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <Card>
        <CardHeader>
          <CardTitle>Data Table</CardTitle>
          <CardDescription>A sortable table of people's information.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <table className="w-full text-sm">
              <thead>
                {table.getHeaderGroups().map(headerGroup => (
                  <tr key={headerGroup.id} className="border-b bg-gray-100">
                    {headerGroup.headers.map(header => (
                      <th key={header.id} className="px-4 py-3 text-left font-medium">
                        {header.isPlaceholder ? null : (
                          <div
                            className="flex items-center space-x-2 cursor-pointer"
                            onClick={header.column.getToggleSortingHandler()}
                          >
                            <span>{flexRender(header.column.columnDef.header, header.getContext())}</span>
                            <TrendingUp />
                            <span className="mx-2">⬆️ </span>
                          </div>
                        )}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody>
                {table.getRowModel().rows.map(row => (
                  <tr key={row.id} className="border-b hover:bg-gray-50">
                    {row.getVisibleCells().map(cell => (
                      <td key={cell.id} className="px-4 py-3">
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
      </div>


      </div>
    </div>
  );
}
  ---

make the results look beautiful with good padding etc and a nice combination of colors always unless the User asks for a sleek UI / performance!
Also try to use the Shadcn UI components as much as possible
remember to always return the JSX directly without any quotes
Also remember to not import or export any of the componenets as we are rendering it an environment that doesnt support import or export.
I would strongly suggest you to use Emojis in place of Icons as we have not yet finalized the icon set
Do not use any image tags or hyperlink anything from outside , use only the components availiable above and emojis and useState and useEffect to make the interactive App

`;

// npx shadcn@latest add "https://v0.dev/chat/b/srX77kA?token=eyJhbGciOiJkaXIiLCJlbmMiOiJBMjU2R0NNIn0..ERhZWwQyLPmAmkMa.N9gLYl-EC9Cnw5V3FW5bVb8MWznVAtZI3D1J9IyqLD9WojqTCVE.UPHuTFx8PfL-k5uyldt1Vw"
