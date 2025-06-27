# Blog_page
Code blog page

<h1>Install & Run </h1>
<li>npx create-next-app@latest </li>
<li>  pnpm run dev</li>
 

    

bottom line animation with tailwine
```bash
 <Link href="/about" 
    className="text-foreground hover:text-primary transition-colors duration-200 font-medium group">
                <span className="relative">
                About
    <span className="absolute left-0 -bottom-1 w-full h-0.5 bg-blue-700 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded">
    </span>
                 </span>
</Link>
```