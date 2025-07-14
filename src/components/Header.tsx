import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown, Moon, HelpCircle, MapPin, LogOut, User, Bell, Copy, Eye } from 'lucide-react';
import { NotificationDropdown } from './NotificationDropdown';
import { Switch } from './ui/switch';
interface HeaderProps {
  showEventTypesHeader?: boolean;
  eventData?: {
    title: string;
    url: string;
    enabled: boolean;
    onEnabledChange: (enabled: boolean) => void;
  };
}
export const Header = ({
  showEventTypesHeader = false,
  eventData
}: HeaderProps) => {
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowProfileDropdown(false);
      }
    };
    if (showProfileDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showProfileDropdown]);
  return;
};