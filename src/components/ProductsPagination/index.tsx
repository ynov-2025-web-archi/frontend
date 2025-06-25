"use client";

import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    totalProducts: number;
    itemsPerPage: number;
}

export function Index({ currentPage, totalPages, totalProducts, itemsPerPage }: PaginationProps) {
    
    console.log(totalProducts);
    
    const generatePageUrl = (page: number) => {
        // Always use relative URLs to avoid hydration mismatch
        return `?page=${page}&limit=${itemsPerPage}`;
    };

    const renderPageNumbers = () => {
        const pages = [];
        const maxVisiblePages = 5;
        
        if (totalPages <= maxVisiblePages) {
            // Show all pages if total is small
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            // Show first page, last page, and pages around current
            pages.push(1);
            
            const start = Math.max(2, currentPage - 1);
            const end = Math.min(totalPages - 1, currentPage + 1);
            
            if (start > 2) {
                pages.push('ellipsis-start');
            }
            
            for (let i = start; i <= end; i++) {
                pages.push(i);
            }
            
            if (end < totalPages - 1) {
                pages.push('ellipsis-end');
            }
            
            if (totalPages > 1) {
                pages.push(totalPages);
            }
        }
        
        return pages;
    };

    if (totalPages <= 1) {
        return null; // Don't show pagination if there's only one page
    }

    return (
        <Pagination>
            <PaginationContent>
                {/* Previous button */}
                <PaginationItem>
                    <PaginationPrevious 
                        href={currentPage > 1 ? generatePageUrl(currentPage - 1) : undefined}
                        className={currentPage <= 1 ? "pointer-events-none opacity-50" : ""}
                    />
                </PaginationItem>
                
                {/* Page numbers */}
                {renderPageNumbers().map((page, index) => {
                    if (page === 'ellipsis-start' || page === 'ellipsis-end') {
                        return (
                            <PaginationItem key={`ellipsis-${index}`}>
                                <PaginationEllipsis />
                            </PaginationItem>
                        );
                    }
                    
                    const pageNum = page as number;
                    return (
                        <PaginationItem key={pageNum}>
                            <PaginationLink 
                                href={generatePageUrl(pageNum)}
                                isActive={pageNum === currentPage}
                            >
                                {pageNum}
                            </PaginationLink>
                        </PaginationItem>
                    );
                })}
                
                {/* Next button */}
                <PaginationItem>
                    <PaginationNext 
                        href={currentPage < totalPages ? generatePageUrl(currentPage + 1) : undefined}
                        className={currentPage >= totalPages ? "pointer-events-none opacity-50" : ""}
                    />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    )
}

export default Index;