import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { type PropsWithChildren } from 'react';

export default function CardLayout({
  children,
  title,
  description,
}: PropsWithChildren<{
  name?: string;
  title?: string;
  description?: string;
}>) {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-4 md:p-8">
      <div className="flex w-full max-w-md flex-col gap-6">
        <div className="flex flex-col gap-6">
          <Card className="rounded-xl">
            <CardHeader className="px-10 pb-0 text-center">
              <CardTitle className="text-xl">{title}</CardTitle>
              <CardDescription>{description}</CardDescription>
            </CardHeader>
            <CardContent className="px-10 pb-6">{children}</CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
