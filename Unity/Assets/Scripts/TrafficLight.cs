using UnityEngine;

public class TrafficLight : MonoBehaviour
{
    public GameObject redLight;
    public GameObject greenLight;

    public bool isRed;

    private float time = 0;
    private float Duration = 10f;
    // Start is called once before the first execution of Update after the MonoBehaviour is created
    void Start()
    {
        isRed = false;
        switchColor();
    }

    // Update is called once per frame
    void Update()
    {
        time += Time.deltaTime;
        if (time >= Duration)
        {
            time = 0;
            switchColor();
        }

    }
    void switchColor()
    {
        if (isRed)
        {
            redLight.gameObject.GetComponent<Renderer>().material.SetColor("_Color", Color.black);
            greenLight.gameObject.GetComponent<Renderer>().material.SetColor("_Color", Color.green);
            isRed = false;
        }
        else
        {
            redLight.gameObject.GetComponent<Renderer>().material.SetColor("_Color", Color.red);
            greenLight.gameObject.GetComponent<Renderer>().material.SetColor("_Color", Color.black);
            isRed = true;
        }
    }
}
