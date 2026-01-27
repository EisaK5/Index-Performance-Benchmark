import { NextResponse } from "next/server"; 
import { query } from "@/lib/db"; 
export async function GET() { 
    try { 
        const result = await query("SELECT * FROM stocks LIMIT 10"); 
        return NextResponse.json({ rows: result.rows }); 
    } catch (err) { 
        return NextResponse.json( 
            {error: "DB Query failed", details: err.message}, 
            { status: 500} ); 
        } 
    }