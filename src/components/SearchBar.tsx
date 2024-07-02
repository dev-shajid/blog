'use client'

import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { IoIosSearch } from "react-icons/io";
import { Separator } from "./ui/separator";
import { getSearch } from "@/lib/api";
import { useEffect, useState } from "react";
import useDebounce from "@/hook/useDebounce";
import { Badge } from "./ui/badge";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "./ui/button";

export function SearchBar() {
    const [searchResult, setSearchResult] = useState<{ success: boolean, found: false, tags: TagType[], posts: PostType[] }>({ success: false, found: false, tags: [], posts: [] })
    const [searchInput, setSearchInput] = useState<string>("")
    const [open, setOpen] = useState<boolean>(false);
    let { debouncedValue, setDebounceInput } = useDebounce()

    const handleSearch = async () => {
        let data: {
            success: boolean;
            found: boolean;
            tags: any;
            posts: any;
        } = await getSearch(searchInput)
        setSearchResult(data)
    }

    const reset = () => {
        setSearchResult({ success: false, found: false, tags: [], posts: [] })
        setSearchInput("")
    }

    const handleChange = async (e) => {
        let val = e.target.value
        if (!val.trim()) reset()
        setSearchInput(val)
        setDebounceInput({ value: val, delay: 500 })
    }

    useEffect(() => {
        handleSearch()
    }, [debouncedValue])


    const pathname = usePathname();
    useEffect(() => {
        setOpen(false)
    }, [pathname])

    useEffect(() => {
        reset()
    }, [open])

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <div className="w-fit" onClick={() => setOpen(true)}>
                    <div className='hidden sm:flex !w-[220px] text-sm justify-between items-center gap-4 border text-gray-500 border-gray-300 dark:border-gray-700 hover:bg-gray-200 hover:dark:bg-gray-800 cursor-pointer rounded-md px-4 py-1.5'>
                        <p>Search Blog</p>
                        <IoIosSearch className='text-[18px]' />
                    </div>
                    <Button size='icon' variant='outline' className="sm:hidden flex justify-center items-center">
                        <IoIosSearch className='text-[18px]' />
                    </Button>
                </div>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px] max-w-[90dvw] p-0 !translate-y-[-30dvh] !origin-top" aria-describedby={undefined}>
                <DialogTitle className="hidden"></DialogTitle>
                <DialogHeader className="flex items-center">
                    <input
                        type="text"
                        className="border-none rounded-md w-full flex-1 p-4 !outline-none !ring-0 focus-within:!shadow-none pr-12 bg-transparent"
                        placeholder="Type to Search..."
                        value={searchInput}
                        onChange={handleChange}
                    />
                    {
                        searchResult.success ?
                            searchResult.found ?
                                <>
                                    {
                                        searchResult.tags.length ?
                                            <>
                                                <Separator />

                                                <div className="w-full !mb-4 px-3">
                                                    <div className="flex flex-wrap gap-2 mt-2">
                                                        {
                                                            searchResult.tags.map((tag, i) => (
                                                                <Link key={i} href={`/tags/${tag.slug.current}`}>
                                                                    <Badge className="!rounded-sm text-sm" key={i}>#{tag.name}</Badge>
                                                                </Link>
                                                            ))
                                                        }
                                                    </div>
                                                </div>
                                            </> : null
                                    }
                                    {
                                        searchResult.posts.length ?
                                            <>
                                                <Separator />

                                                <div className="p-2 pt-0 w-full">
                                                    {
                                                        searchResult.posts.map((item, i) => (
                                                            <Link href={`/posts/${item.slug.current}`} key={i} className="flex items-center gap-3 p-2 rounded-sm cursor-pointer hover:bg-gray-200 hover:dark:bg-gray-800 transition">
                                                                <IoIosSearch className="text- " />
                                                                <p>{item.title}</p>
                                                            </Link>
                                                        ))
                                                    }
                                                </div>
                                            </> : null
                                    }

                                </>
                                : <>
                                    <Separator />
                                    <div className="w-full text-center p-4">Nothing Found!</div>
                                </>
                            : null
                    }
                    <DialogClose asChild></DialogClose>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}