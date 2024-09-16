import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const Step2Dependencies = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-[#CE4F3D]">
          Step 2: Resolve Circular Dependencies
        </CardTitle>
        <CardDescription>
          We need to first resolve all circular dependencies and preferbaly
          rewrite the code to prepapre it for a smooth migration.
        </CardDescription>
      </CardHeader>
      <CardContent></CardContent>
    </Card>
  );
};

export default Step2Dependencies;
