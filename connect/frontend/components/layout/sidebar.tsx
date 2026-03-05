'use client';

import { cn } from '@/lib/utils';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import {
  Search,
  Mail,
  Target,
  BarChart3,
  Inbox,
  Settings,
  Home,
  Folder,
  Database,
  Zap,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navigation = [
  { name: 'Dashboard', href: '/', icon: Home },
  { name: 'SuperSearch', href: '/supersearch', icon: Search },
  { name: 'Email Accounts', href: '/email-accounts', icon: Mail },
  { name: 'Campaigns', href: '/campaigns', icon: Folder },
  { name: 'Scraping Campaigns', href: '/scraping-campaigns', icon: Database },
  { name: 'Analytics', href: '/analytics', icon: BarChart3 },
  { name: 'Unibox', href: '/unibox', icon: Inbox },
];

const bottomNavigation = [
  { name: 'Settings', href: '/settings', icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="fixed inset-y-0 left-0 z-50 w-[60px] bg-sidebar flex flex-col border-r border-sidebar-border">
      {/* Logo */}
      <div className="flex h-14 items-center justify-center border-b border-sidebar-border">
        <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
          <Zap className="w-4 h-4 text-primary-foreground" />
        </div>
      </div>

      <TooltipProvider delayDuration={0}>
        <ScrollArea className="flex-1 py-3">
          <nav className="space-y-1 px-2">
            {navigation.map((item) => {
              const isActive = pathname === item.href ||
                (item.href !== '/' && pathname.startsWith(item.href));
              return (
                <Tooltip key={item.name}>
                  <TooltipTrigger asChild>
                    <Link
                      href={item.href}
                      className={cn(
                        'flex items-center justify-center w-10 h-10 rounded-lg transition-all duration-150 mx-auto',
                        isActive
                          ? 'bg-primary text-primary-foreground shadow-md shadow-primary/25'
                          : 'text-sidebar-foreground/60 hover:text-sidebar-foreground hover:bg-sidebar-accent'
                      )}
                    >
                      <item.icon className="h-[18px] w-[18px]" strokeWidth={isActive ? 2.5 : 2} />
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent side="right" sideOffset={8}>
                    <p className="text-xs font-medium">{item.name}</p>
                  </TooltipContent>
                </Tooltip>
              );
            })}
          </nav>
        </ScrollArea>

        {/* Bottom Navigation */}
        <div className="py-3 px-2 border-t border-sidebar-border">
          {bottomNavigation.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Tooltip key={item.name}>
                <TooltipTrigger asChild>
                  <Link
                    href={item.href}
                    className={cn(
                      'flex items-center justify-center w-10 h-10 rounded-lg transition-all duration-150 mx-auto',
                      isActive
                        ? 'bg-primary text-primary-foreground shadow-md shadow-primary/25'
                        : 'text-sidebar-foreground/60 hover:text-sidebar-foreground hover:bg-sidebar-accent'
                    )}
                  >
                    <item.icon className="h-[18px] w-[18px]" strokeWidth={isActive ? 2.5 : 2} />
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="right" sideOffset={8}>
                  <p className="text-xs font-medium">{item.name}</p>
                </TooltipContent>
              </Tooltip>
            );
          })}
        </div>
      </TooltipProvider>
    </div>
  );
}
