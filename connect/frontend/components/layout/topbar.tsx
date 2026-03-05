'use client';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import {
  Coins,
  Crown,
  ChevronDown,
  Building,
  User,
  LogOut,
  Moon,
  Sun,
} from 'lucide-react';
import { useTheme } from 'next-themes';

export function TopBar() {
  const { theme, setTheme } = useTheme();

  return (
    <header className="bg-card border-b border-border h-14 flex items-center justify-between px-6">
      <div />

      <div className="flex items-center gap-3 ml-auto">
        {/* Credits Balance */}
        <Badge variant="secondary" className="flex items-center gap-1.5 px-3 py-1 font-medium text-xs">
          <Coins className="w-3.5 h-3.5 text-warning" />
          <span>2,450 Credits</span>
        </Badge>

        {/* Upgrade Button */}
        <Button size="sm" className="bg-gradient-to-r from-primary to-chart-3 hover:opacity-90 text-white border-0 text-xs h-8">
          <Crown className="w-3.5 h-3.5 mr-1.5" />
          Upgrade
        </Button>

        {/* Theme Toggle */}
        <Button
          variant="ghost"
          size="sm"
          className="h-8 w-8 p-0"
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        >
          <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>

        {/* Organization Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="flex items-center gap-2 h-8 text-xs">
              <Building className="w-3.5 h-3.5 text-muted-foreground" />
              <span className="font-medium">Acme Corp</span>
              <ChevronDown className="w-3 h-3 text-muted-foreground" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-52">
            <DropdownMenuLabel className="text-xs">Organization</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-xs">
              <Building className="w-3.5 h-3.5 mr-2" />
              Acme Corp
            </DropdownMenuItem>
            <DropdownMenuItem className="text-xs">
              <Building className="w-3.5 h-3.5 mr-2" />
              TechStart Inc
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-xs">
              <User className="w-3.5 h-3.5 mr-2" />
              Create Organization
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* User Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-8 w-8 rounded-full p-0">
              <Avatar className="h-7 w-7">
                <AvatarImage src="/avatars/01.png" alt="@user" />
                <AvatarFallback className="text-[10px] bg-primary/10 text-primary font-semibold">JD</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-52" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col gap-1">
                <p className="text-sm font-medium leading-none">John Doe</p>
                <p className="text-xs leading-none text-muted-foreground">
                  john@acmecorp.com
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-xs">
              <User className="mr-2 h-3.5 w-3.5" />
              Profile
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-xs">
              <LogOut className="mr-2 h-3.5 w-3.5" />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
