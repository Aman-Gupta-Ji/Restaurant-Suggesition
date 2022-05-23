import java.util.*;
import java.io.*;

class Restro {
    char gender;
    int age;
    String food;
    float pricing;
    float rating;
    String name;
    Restro(char g, int a, String f, float r, String n, float p) {
        gender=g;
        age=a;
        food=f;
        rating=r;
        name=n;
        pricing=p;
    }
}
class Main {
    static ArrayList<Restro> list;
    static void readData(String src) {
        String nextLine[];
        char g;
        int a;
        float r, p;
        String f, n;
        String line, splitBy=",";
        try {
            BufferedReader br = new BufferedReader(new FileReader(src));  
            line=br.readLine();
            while ((line = br.readLine()) != null) {  
                nextLine = line.split(splitBy);
                if(nextLine.length!=7)
                    continue;
                g=nextLine[1].charAt(0);
                a=Integer.parseInt(nextLine[2]);
                f=nextLine[3].toLowerCase();
                r=Float.parseFloat(nextLine[4]);
                n=nextLine[5];
                p=Float.parseFloat(nextLine[6]);
                list.add(new Restro(g,a,f,r,n,p));
            }
        }
        catch(Exception e)  {
            System.out.println(e.toString());
        }
        System.out.println(list.size());
    }
    static ArrayList<Restro> findMatch(int age, char gender, String food, float rating, float pricing) {
        ArrayList<Pair<Integer,Restro>> gf=new ArrayList<Pair<Integer,Restro>>();
        int score;
        for(Restro r: list) {
            if(!r.food.equals(food))
                continue;
            score=0;
            if(r.gender==gender)
                score++;
            if(Math.abs(r.age-age)<5)
                score++;
            if(Math.abs(r.rating-rating)<1)
                score++;
            if(Math.abs(r.pricing-pricing)<200)
                score++;
            if(score>1)
                gf.add(r);
        }
        return gf;
    }
    public static void main(String arg[]) {
        list=new ArrayList<Restro>();
        readData("D:\\Restro\\DataBase\\restro.csv");
        Scanner sc=new Scanner(System.in);
        Scanner nm=new Scanner(System.in);
        System.out.println("Enter your age, gender, food preference, rating , pricing:");
        int age=nm.nextInt();
        char gender=Character.toUpperCase(sc.nextLine().charAt(0));
        String food=sc.nextLine().toLowerCase();
        float rating=nm.nextFloat();
        float pricing=nm.nextFloat();
        ArrayList<Restro> res=findMatch(age,gender,food,rating,pricing);
        for(Restro r: res)
            System.out.println(r.name+" : "+r.rating+" - $"+r.pricing);
        sc.close();
        nm.close();
    }
}
