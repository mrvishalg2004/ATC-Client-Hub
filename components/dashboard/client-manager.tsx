"use client";

import { useState, useMemo, useCallback, useEffect } from "react";
import type { Client, ClientStatus } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { MoreHorizontal, PlusCircle, Trash2, Edit } from "lucide-react";
import { projectTypes, clientStatuses } from "@/lib/types";
import { ClientFormDialog } from "./client-form";
import { useToast } from "@/hooks/use-toast";

export default function ClientManager({ initialClients }: { initialClients: Client[] }) {
  const [clients, setClients] = useState<Client[]>(initialClients);
  const [filters, setFilters] = useState<{ projectType: string; status: string }>({ projectType: 'all', status: 'all' });
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingClient, setEditingClient] = useState<Client | null>(null);
  const { toast } = useToast();

  const handleFilterChange = (filterType: 'projectType' | 'status') => (value: string) => {
    setFilters(prev => ({ ...prev, [filterType]: value }));
  };

  const filteredClients = useMemo(() => {
    return clients.filter(client => {
      const projectTypeMatch = filters.projectType === 'all' || client.projectType === filters.projectType;
      const statusMatch = filters.status === 'all' || client.status === filters.status;
      return projectTypeMatch && statusMatch;
    });
  }, [clients, filters]);

  const refreshClients = useCallback(async () => {
    try {
      const response = await fetch("/api/clients", { cache: "no-store" });
      if (!response.ok) {
        throw new Error("Failed to fetch clients");
      }
      const data = await response.json();
      setClients(data.clients ?? []);
    } catch (error) {
      console.error(error);
      toast({ title: "Unable to load clients", variant: "destructive" });
    } finally {
    }
  }, [toast]);

  useEffect(() => {
    refreshClients();
  }, [refreshClients]);

  const handleAddClient = () => {
    setEditingClient(null);
    setIsFormOpen(true);
  };

  const handleEditClient = (client: Client) => {
    setEditingClient(client);
    setIsFormOpen(true);
  };

  const handleDeleteClient = useCallback(async (id: string) => {
    try {
      const response = await fetch(`/api/clients/${id}`, { method: "DELETE" });
      if (!response.ok) {
        throw new Error("Delete failed");
      }
      await refreshClients();
      toast({ title: "Client removed" });
    } catch (error) {
      console.error(error);
      toast({ title: "Unable to delete client", variant: "destructive" });
    }
  }, [refreshClients, toast]);
  
  const handleSaveClient = useCallback(async (clientData: Omit<Client, 'id' | 'createdAt'>) => {
    try {
      const endpoint = editingClient ? `/api/clients/${editingClient.id}` : "/api/clients";
      const method = editingClient ? "PUT" : "POST";
      const response = await fetch(endpoint, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(clientData),
      });
      if (!response.ok) {
        const errorBody = await response.json().catch(() => ({}));
        throw new Error(errorBody?.error ?? "Save failed");
      }
      await refreshClients();
      setEditingClient(null);
      toast({ title: editingClient ? "Client updated" : "Client added" });
    } catch (error) {
      console.error(error);
      toast({ title: "Unable to save client", description: error instanceof Error ? error.message : undefined, variant: "destructive" });
      throw error;
    }
  }, [editingClient, refreshClients, toast]);

  const getStatusVariant = (status: ClientStatus): "default" | "secondary" | "destructive" => {
    switch (status) {
      case 'Completed': return 'default';
      case 'In Progress': return 'secondary';
      case 'New': return 'destructive';
      default: return 'outline';
    }
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <CardTitle>Clients</CardTitle>
          <div className="flex flex-col sm:flex-row items-center gap-2">
            <Select onValueChange={handleFilterChange('projectType')} defaultValue="all">
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Project Types</SelectItem>
                {projectTypes.map(type => <SelectItem key={type} value={type}>{type}</SelectItem>)}
              </SelectContent>
            </Select>
            <Select onValueChange={handleFilterChange('status')} defaultValue="all">
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                {clientStatuses.map(status => <SelectItem key={status} value={status}>{status}</SelectItem>)}
              </SelectContent>
            </Select>
            <Button onClick={handleAddClient} className="w-full sm:w-auto">
              <PlusCircle className="mr-2 h-4 w-4" /> Add Client
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead className="hidden md:table-cell">Project Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="hidden md:table-cell">Budget</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredClients.map((client) => (
                <TableRow key={client.id}>
                  <TableCell>
                    <div className="font-medium">{client.name}</div>
                    <div className="text-sm text-muted-foreground break-all">{client.email}</div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">{client.projectType}</TableCell>
                  <TableCell>
                    <Badge variant={getStatusVariant(client.status)}>{client.status}</Badge>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">${client.budget.toLocaleString()}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Open menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleEditClient(client)}>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleDeleteClient(client.id)} className="text-destructive">
                           <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
      <ClientFormDialog 
        isOpen={isFormOpen} 
        setIsOpen={setIsFormOpen} 
        client={editingClient}
        onSave={handleSaveClient}
      />
    </Card>
  );
}
