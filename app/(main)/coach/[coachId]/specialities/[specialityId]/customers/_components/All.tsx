import React from "react";

import {
  Card,
  CardHeader,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { getAllCustomers } from "@/data";
import { TabsContent } from "@/components/ui/tabs";
import { DataTable } from "./data-table";
import { columns } from "./columns";

type Props = {
  params: {
    coachId: string;
    specialityId: string;
  };
};

const All = async ({ params }: Props) => {
  const allCustomers = await getAllCustomers();
  const data = allCustomers.map((customer) => {
    return {
      id: customer.id,
      email: customer.User.email,
      name: customer.User.name,
      status: customer.status,
      createdAt: customer.createdAt.toLocaleDateString(),
      coachId: params.coachId,
      specialityId: params.specialityId,
    };
  });

  return (
    <TabsContent value="all">
      <Card>
        <CardHeader>
          <CardTitle>All Customers</CardTitle>
          <CardDescription>
            Manage all customers for this speciality
          </CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable columns={columns} data={data} />
        </CardContent>
      </Card>
    </TabsContent>
  );
};

export default All;
