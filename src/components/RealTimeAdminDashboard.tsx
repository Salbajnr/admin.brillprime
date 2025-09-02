
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Activity, Users, TrendingUp, AlertTriangle } from 'lucide-react';

interface RealTimeData {
  activeUsers: number;
  activeConnections: number;
  messagesSent: number;
  errorRate: number;
}

export default function RealTimeAdminDashboard() {
  const [data, setData] = useState<RealTimeData>({
    activeUsers: 0,
    activeConnections: 0,
    messagesSent: 0,
    errorRate: 0
  });

  useEffect(() => {
    // Mock real-time data updates
    const interval = setInterval(() => {
      setData({
        activeUsers: Math.floor(Math.random() * 1000) + 500,
        activeConnections: Math.floor(Math.random() * 200) + 100,
        messagesSent: Math.floor(Math.random() * 10000) + 5000,
        errorRate: Math.random() * 2
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.activeUsers.toLocaleString()}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Connections</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.activeConnections}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Messages Sent</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.messagesSent.toLocaleString()}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Error Rate</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.errorRate.toFixed(2)}%</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
